import urllib.request
import json
import os
import certifi
import ssl

context = ssl.create_default_context(cafile=certifi.where())

SUPABASE_URL = "https://khlvkvusavalbkjrwbsy.supabase.co"
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

# We need the service role key from .env.local
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
        print(f"Success: uploaded {file_name}")
    except urllib.error.HTTPError as e:
        print(f"Error uploading {file_name}: {e.code} {e.read()}")

images_to_upload = {
    "https://atasaedu.com/assetsLan/img/logo.png": ("logo.png", "image/png"),
    "https://atasaedu.com/assetsLan/img/logo-white.png": ("logo-white.png", "image/png"),
    "https://atasaedu.com/assetsLan/img/hero/hero_thumb_1_1.png": ("hero_thumb.png", "image/png"),
    "https://atasaedu.com/assetsLan/img/hero/hero_bg_1_1.png": ("hero_bg.png", "image/png"),
    "https://atasaedu.com/assetsLan/img/normal/about_1_1.png": ("about_img.png", "image/png"),
    "https://atasaedu.com/assetsLan/img/bg/cta-bg_3_1.png": ("cta_bg.png", "image/png"),
    "https://atasaedu.com/assetsLan/img/normal/student-group_1_1.png": ("university-campus.jpg", "image/jpeg"),
}

for source_url, (dest_name, mime_type) in images_to_upload.items():
    print(f"Downloading {source_url}...")
    try:
        req = urllib.request.Request(source_url, headers={'User-Agent': 'Mozilla/5.0'})
        image_data = urllib.request.urlopen(req, context=context).read()
        print(f"Uploading {dest_name}...")
        upload_to_supabase(image_data, dest_name, mime_type)
    except Exception as e:
        print(f"Failed {source_url}: {e}")

