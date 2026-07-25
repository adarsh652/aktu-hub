from PIL import Image

try:
    img = Image.open("public/logo.png")
    w, h = img.size
    
    # We crop the left square (since height is 204, a 204x204 crop will capture the AKTU box)
    # To be precise, let's scan the pixels to crop the black box boundaries exactly.
    rgba = img.convert("RGBA")
    
    # Let's find the bounding box of non-transparent pixels on the left side
    # We search the left 40% of the image
    max_search_x = int(w * 0.4)
    left, top, right, bottom = w, h, 0, 0
    
    for y in range(h):
        for x in range(max_search_x):
            r, g, b, a = rgba.getpixel((x, y))
            if a > 50: # Significant opacity (part of the black box)
                if x < left: left = x
                if x > right: right = x
                if y < top: top = y
                if y > bottom: bottom = y
                
    # Add a tiny padding to keep it clean (e.g. 2px)
    padding = 4
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(w, right + padding)
    bottom = min(h, bottom + padding)
    
    box_w = right - left
    box_h = bottom - top
    
    # Force it to be a perfect square
    size = max(box_w, box_h)
    diff_w = size - box_w
    diff_h = size - box_h
    
    left = max(0, left - diff_w // 2)
    top = max(0, top - diff_h // 2)
    right = left + size
    bottom = top + size
    
    cropped = img.crop((left, top, right, bottom))
    
    # Resize to standard favicon sizes (e.g., 64x64 or 128x128)
    favicon = cropped.resize((128, 128), Image.Resampling.LANCZOS)
    
    favicon.save("public/favicon.png", "PNG")
    print(f"Extracted square AKTU box: left={left}, top={top}, size={size} and saved to public/favicon.png")
    
except Exception as e:
    print(f"Error cropping favicon: {e}")
