import urllib.request
import json
import os
import certifi
import ssl
import time

context = ssl.create_default_context(cafile=certifi.where())

SUPABASE_URL = "https://khlvkvusavalbkjrwbsy.supabase.co"
SUPABASE_KEY = ""

with open('.env.local') as f:
    for line in f:
        if line.startswith('SUPABASE_SERVICE_ROLE_KEY='):
            SUPABASE_KEY = line.strip().split('=', 1)[1]

def upload_to_supabase(image_data, file_name, content_type):
    url = f"{SUPABASE_URL}/storage/v1/object/public-assets/atasaedu/{file_name}"
    
    req = urllib.request.Request(url, data=image_data, method='POST')
    req.add_header('Authorization', f'Bearer {SUPABASE_KEY}')
    req.add_header('Content-Type', content_type)
    
    try:
        response = urllib.request.urlopen(req, context=context)
        response.read()
        print(f"Success: uploaded {file_name}")
    except urllib.error.HTTPError as e:
        msg = e.read()
        if e.code == 400 and b'Duplicate' in msg:
            print(f"Skipped {file_name}: already exists.")
        else:
            print(f"Error uploading {file_name}: {e.code} {msg}")

images_to_upload = {
    "https://atasaedu.com/assetsLan/img/hero/hero_thumb_1_1.png": ("hero_thumb.png", "image/png"),
    "https://atasaedu.com/assetsLan/img/hero/hero_bg_1_1.png": ("hero_bg.png", "image/png"),
    "https://atasaedu.com/assetsLan/img/normal/about_1_1.png": ("about_img.png", "image/png"),
    "https://atasaedu.com/assetsLan/img/bg/cta-bg_3_1.png": ("cta_bg.png", "image/png"),
    "https://atasaedu.com/assetsLan/img/normal/student-group_1_1.png": ("home/university-campus.jpg", "image/jpeg"),
    "https://atasaedu.com/images/Universities/13/0.png": ("home/university-logos/altinbas.png", "image/png"),
    "https://atasaedu.com/images/Universities/15/0.png": ("home/university-logos/ankara-bilim.png", "image/png"),
    "https://atasaedu.com/images/Universities/14/0.png": ("home/university-logos/medipol.png", "image/png"),
    "https://atasaedu.com/images/Universities/16/0.png": ("home/university-logos/antalya-bilim.png", "image/png"),
    "https://atasaedu.com/images/Universities/17/0.jpg": ("home/university-logos/atlas.png", "image/jpeg"),
    "https://atasaedu.com/images/Universities/19/0.png": ("home/university-logos/bau.png", "image/png")
}

for source_url, (dest_name, mime_type) in images_to_upload.items():
    print(f"Downloading {source_url}...")
    try:
        req = urllib.request.Request(source_url, headers={'User-Agent': 'Mozilla/5.0'})
        image_data = urllib.request.urlopen(req, context=context).read()
        print(f"Uploading {dest_name}...")
        upload_to_supabase(image_data, dest_name, mime_type)
        time.sleep(0.5)
    except Exception as e:
        print(f"Failed {source_url}: {e}")

print("Done scripting.")
