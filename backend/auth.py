from passlib.context import CryptContext
from sqlalchemy.orm import Session
from database import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_user(db: Session, username, password):
    user = User(username=username, password=hash_password(password))
    db.add(user)
    db.commit()
    return user

def authenticate(db: Session, username, password):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return user