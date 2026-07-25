from PIL import Image

try:
    img = Image.open("public/logo.png")
    print(f"Logo dimensions: {img.size}")
except Exception as e:
    print(f"Error opening logo.png: {e}")
