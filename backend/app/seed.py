from datetime import datetime, timedelta
from passlib.context import CryptContext
from .database import Base, engine, SessionLocal
from .models import User, Course, Enrollment, Assignment, Submission, Attendance, Performance

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")
def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    if db.query(User).count(): db.close(); return
    admin = User(name="System Admin", email="admin@ailms.com", password_hash=pwd.hash("Demo@123"), role="admin")
    faculty = User(name="Dr. Sharma", email="faculty@ailms.com", password_hash=pwd.hash("Demo@123"), role="faculty")
    student = User(name="Deekshitha Rao", email="student@ailms.com", password_hash=pwd.hash("Demo@123"), role="student")
    db.add_all([admin, faculty, student]); db.flush()
    names = [("Database Systems","CS301",86),("Java Programming","CS302",72),("Mathematics","MA201",51),("Computer Networks","CS303",84),("Operating Systems","CS304",68),("Data Structures","CS305",79)]
    courses=[]
    for name, code, score in names:
        course=Course(name=name, code=code, description="Build practical foundations through guided lessons, labs and assessments.", faculty_id=faculty.id); db.add(course); db.flush(); courses.append((course,score))
        db.add(Enrollment(student_id=student.id,course_id=course.id,progress=score))
        db.add(Performance(student_id=student.id,course_id=course.id,score=score,assessment="exam"))
        for day in range(1, 11): db.add(Attendance(student_id=student.id,course_id=course.id,present=(day % 8 != 0)))
    for course, score in courses[:4]:
        assignment=Assignment(title=f"{course.name} applied assignment",description="Submit your solution and supporting notes.",due_date=datetime.utcnow()+timedelta(days=7),max_marks=20,course_id=course.id); db.add(assignment); db.flush()
        db.add(Submission(assignment_id=assignment.id,student_id=student.id,status="graded" if score > 70 else "pending",marks=round(score/5,1) if score > 70 else None,feedback="Clear work. Keep practicing the weaker concepts."))
    db.commit(); db.close()
if __name__ == "__main__": seed()
