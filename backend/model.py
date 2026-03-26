import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = models.mobilenet_v2(weights=None)
model.classifier[1] = nn.Linear(model.last_channel, 1)

state_dict = torch.load("model.pth", map_location=device)

# remove 'module.' prefix
new_state_dict = {}
for k, v in state_dict.items():
    if k.startswith("module."):
        k = k[7:]
    new_state_dict[k] = v

model.load_state_dict(new_state_dict)
model.to(device)
model.eval()

transform = transforms.Compose([
    transforms.Resize(224),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

def predict(image: Image.Image):
    img = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(img)
        prob = torch.sigmoid(output).item()

    label = "FAKE" if prob > 0.5 else "REAL"
    return label, prob