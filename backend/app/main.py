import os
from datetime import datetime, timedelta
from typing import Optional
from fastapi import FastAPI, Depends, HTTPException, status, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from jose import jwt, JWTError
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from sqlalchemy import func
from .database import Base, engine, get_db
from .models import User, Course, Enrollment, Assignment, Submission, Attendance, Performance
from .seed import seed

SECRET = os.getenv("JWT_SECRET", "dev-only-change-me")
ALGORITHM = "HS256"
pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")
app = FastAPI(title="AI-LMS API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173").split(","), allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

class Credentials(BaseModel): email: EmailStr; password: str
class CourseIn(BaseModel): name: str; code: str; description: str = ""
class AssignmentIn(BaseModel): title: str; description: str = ""; due_date: datetime; max_marks: int = 100; course_id: int
class PredictionIn(BaseModel): attendance: float=85; assignment_average: float=80; quiz_average: float=75; midterm_score: float=75; previous_exam_score: float=75; course_completion: float=70; previous_semester_performance: float=75
class ChatIn(BaseModel): message: str

def token_for(user): return jwt.encode({"sub": str(user.id), "role": user.role, "exp": datetime.utcnow()+timedelta(hours=12)}, SECRET, algorithm=ALGORITHM)
def get_user(authorization: str | None = Header(default=None), db: Session = Depends(get_db)):
    if not authorization or not authorization.startswith("Bearer "): raise HTTPException(status_code=401, detail="Authentication required")
    try: uid = int(jwt.decode(authorization[7:], SECRET, algorithms=[ALGORITHM])["sub"])
    except (JWTError, KeyError, ValueError): raise HTTPException(status_code=401, detail="Invalid or expired token")
    user=db.get(User,uid)
    if not user: raise HTTPException(status_code=401, detail="User not found")
    return user

def role(*roles):
    def dep(user=Depends(get_user)):
        if user.role not in roles: raise HTTPException(status_code=403, detail="Insufficient permissions")
        return user
    return dep

@app.on_event("startup")
def startup(): Base.metadata.create_all(bind=engine); seed()

@app.post("/api/auth/register")
def register(data: Credentials, db: Session=Depends(get_db)):
    if db.query(User).filter_by(email=data.email).first(): raise HTTPException(409,"Email already registered")
    user=User(name=data.email.split("@")[0].title(),email=data.email,password_hash=pwd.hash(data.password),role="student"); db.add(user); db.commit(); db.refresh(user)
    return {"token":token_for(user),"user":{"id":user.id,"name":user.name,"email":user.email,"role":user.role}}

@app.post("/api/auth/login")
def login(data: Credentials, db: Session=Depends(get_db)):
    user=db.query(User).filter_by(email=data.email).first()
    if not user or not pwd.verify(data.password,user.password_hash): raise HTTPException(401,"Invalid email or password")
    return {"token":token_for(user),"user":{"id":user.id,"name":user.name,"email":user.email,"role":user.role}}

@app.get("/api/auth/me")
def me(user=Depends(get_user)): return {"id":user.id,"name":user.name,"email":user.email,"role":user.role}

def course_json(c, student_id=None):
    progress=0
    if student_id:
        e=next((x for x in c.enrollments if x.student_id==student_id),None); progress=e.progress if e else 0
    return {"id":c.id,"name":c.name,"code":c.code,"description":c.description,"faculty":c.faculty.name,"progress":progress,"assignments":len(c.assignments)}

@app.get("/api/courses")
def courses(user=Depends(get_user),db:Session=Depends(get_db)):
    query=db.query(Course)
    if user.role=="student": query=query.join(Enrollment).filter(Enrollment.student_id==user.id)
    return [course_json(c,user.id if user.role=="student" else None) for c in query.all()]

@app.post("/api/courses")
def create_course(data:CourseIn,user=Depends(role("admin","faculty")),db:Session=Depends(get_db)):
    c=Course(**data.model_dump(),faculty_id=user.id); db.add(c); db.commit(); db.refresh(c); return course_json(c)

@app.get("/api/assignments")
def assignments(user=Depends(get_user),db:Session=Depends(get_db)):
    rows=db.query(Assignment).all(); result=[]
    for a in rows:
        sub=next((s for s in a.submissions if s.student_id==user.id),None)
        result.append({"id":a.id,"title":a.title,"course":a.course.name,"course_id":a.course_id,"due_date":a.due_date,"max_marks":a.max_marks,"status":sub.status if sub else "pending","marks":sub.marks if sub else None,"feedback":sub.feedback if sub else ""})
    return result

@app.post("/api/assignments")
def create_assignment(data:AssignmentIn,user=Depends(role("admin","faculty")),db:Session=Depends(get_db)):
    a=Assignment(**data.model_dump()); db.add(a); db.commit(); db.refresh(a); return {"id":a.id,"title":a.title}

@app.post("/api/assignments/{assignment_id}/submit")
def submit(assignment_id:int,user=Depends(role("student")),db:Session=Depends(get_db)):
    if not db.get(Assignment,assignment_id): raise HTTPException(404,"Assignment not found")
    sub=db.query(Submission).filter_by(assignment_id=assignment_id,student_id=user.id).first()
    if not sub: sub=Submission(assignment_id=assignment_id,student_id=user.id); db.add(sub)
    sub.status="submitted"; sub.submitted_at=datetime.utcnow(); db.commit(); return {"status":sub.status}

@app.get("/api/attendance/student/{student_id}")
def attendance(student_id:int,user=Depends(get_user),db:Session=Depends(get_db)):
    if user.id!=student_id and user.role=="student": raise HTTPException(403,"Forbidden")
    output=[]
    for c in db.query(Course).all():
        rows=db.query(Attendance).filter_by(student_id=student_id,course_id=c.id).all()
        if rows: output.append({"course":c.name,"course_id":c.id,"percentage":round(sum(x.present for x in rows)/len(rows)*100)})
    return output

@app.get("/api/analytics/student/{student_id}")
def analytics(student_id:int,user=Depends(get_user),db:Session=Depends(get_db)):
    if user.id!=student_id and user.role=="student": raise HTTPException(403,"Forbidden")
    records=db.query(Performance).filter_by(student_id=student_id).all(); scores=[r.score for r in records]
    subjects=[{"name":r.course.name if hasattr(r,'course') else db.get(Course,r.course_id).name,"score":r.score} for r in records]
    return {"overall":round(sum(scores)/len(scores)) if scores else 0,"subjects":subjects,"trend":[{"month":m,"score":s} for m,s in zip(["Jan","Feb","Mar","Apr","May","Jun"],[64,68,70,74,76,round(sum(scores)/len(scores)) if scores else 0])],"risk":"HIGH" if scores and min(scores)<60 else "MEDIUM"}

@app.post("/api/ai/predict-performance")
def predict(data:PredictionIn,user=Depends(get_user)):
    values=data.model_dump(); predicted=round(sum(values.values())/len(values),1); risk="LOW" if predicted>=75 else "MEDIUM" if predicted>=60 else "HIGH"
    return {"predicted_final_score":predicted,"range":f"{max(0,round(predicted-3))}-{min(100,round(predicted+3))}%","risk":risk,"confidence":round(min(0.97,0.65+predicted/300),2)}

@app.get("/api/ai/recommendations")
def recommendations(user=Depends(role("student")),db:Session=Depends(get_db)):
    data=analytics(user.id,user,db); weak=min(data["subjects"],key=lambda x:x["score"],default={"name":"your priority subject","score":70})
    return [{"title":f"Focus on {weak.get('name','your priority subject')}","description":f"Your current score is {weak.get('score',0)}%. Schedule two focused practice sessions before the next assessment."},{"title":"Maintain attendance","description":"Keep attending upcoming classes and review missed material within 24 hours."}]

@app.post("/api/ai/chat")
def chat(data:ChatIn,user=Depends(get_user),db:Session=Depends(get_db)):
    text=data.message.lower(); info=analytics(user.id,user,db); weak=min(info["subjects"],key=lambda x:x["score"],default={"name":"your priority subject","score":0})
    if "plan" in text or "study" in text: reply=f"Try 45 minutes on {weak.get('name')}, 30 minutes reviewing class notes, and one practice quiz. Finish by reviewing your mistakes."
    elif "performance" in text or "score" in text: reply=f"Your overall performance is {info['overall']}%. {weak.get('name')} is currently the best area to improve."
    else: reply=f"I can help you plan study time, explain topics, and interpret your results. Based on your data, start with {weak.get('name')}."
    return {"reply":reply}
