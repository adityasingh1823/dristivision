import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import os

# ✅ FORCE CPU (important for Render)
device = torch.device("cpu")

# ✅ Load model safely
model = models.mobilenet_v2(weights=None)
model.classifier[1] = nn.Linear(model.last_channel, 1)

# ✅ Safe model path
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pth")

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")

# ✅ Load state dict safely
state_dict = torch.load(MODEL_PATH, map_location=device)

# ✅ Fix multi-GPU issue (remove 'module.')
new_state_dict = {}
for k, v in state_dict.items():
    if k.startswith("module."):
        k = k[7:]
    new_state_dict[k] = v

model.load_state_dict(new_state_dict)
model.to(device)
model.eval()

# ✅ Image preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),  # safer than separate resize + crop
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


# ✅ MAIN PREDICT FUNCTION
def predict(image: Image.Image):
    try:
        # ✅ Ensure correct format (handles jpg, jpeg, png)
        image = image.convert("RGB")

        # ✅ Apply transforms
        img = transform(image).unsqueeze(0).to(device)

        with torch.no_grad():
            output = model(img)
            prob = torch.sigmoid(output).item()

        label = "FAKE" if prob > 0.5 else "REAL"

        return label, float(prob)

    except Exception as e:
        return "ERROR", str(e)
