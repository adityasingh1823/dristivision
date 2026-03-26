from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from model import predict
from database import SessionLocal
from auth import create_user, authenticate
import io

app = FastAPI(title="DristiVision API 🚀")

# ✅ CORS (important for Vercel frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later replace with your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ ROOT ROUTE (VERY IMPORTANT for Render health check)
@app.get("/")
def home():
    return {"message": "DristiVision backend is running 🚀"}


# ✅ SIGNUP (fixed request format)
@app.post("/signup")
def signup(data: dict, db=Depends(get_db)):
    try:
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            raise HTTPException(status_code=400, detail="Missing username or password")

        create_user(db, username, password)

        return {"message": "User created successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ✅ LOGIN (fixed request format)
@app.post("/login")
def login(data: dict, db=Depends(get_db)):
    try:
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            raise HTTPException(status_code=400, detail="Missing username or password")

        user = authenticate(db, username, password)

        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        return {"message": "Login successful"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ✅ PREDICT (fully safe)
@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    try:
        # ✅ Validate file type
        if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
            raise HTTPException(status_code=400, detail="Invalid file type")

        # ✅ Read image safely
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        label, prob = predict(image)

        if label == "ERROR":
            raise HTTPException(status_code=500, detail=prob)

        return {
            "prediction": label,
            "confidence": round(prob, 4)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
