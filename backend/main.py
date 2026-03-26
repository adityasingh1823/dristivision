from fastapi import FastAPI, UploadFile, File, Depends
from PIL import Image
from model import predict
from database import SessionLocal
from auth import create_user, authenticate

app = FastAPI(title="DristiVision API")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict to your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/signup")
def signup(username: str, password: str, db=Depends(get_db)):
    user = create_user(db, username, password)
    return {"message": "User created"}

@app.post("/login")
def login(username: str, password: str, db=Depends(get_db)):
    user = authenticate(db, username, password)
    if not user:
        return {"error": "Invalid credentials"}
    return {"message": "Login successful"}

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    image = Image.open(file.file).convert("RGB")
    label, prob = predict(image)

    return {
        "prediction": label,
        "confidence": prob
    }