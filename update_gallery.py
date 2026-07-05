import os
import json

# images 폴더
IMAGE_DIR = "images"

# 생성될 json
OUTPUT_FILE = "photos.json"

# 허용 확장자
IMAGE_EXTENSIONS = (
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".bmp",
    ".JPG",
    ".JPEG",
    ".PNG"
)

photo_data = {}

# images 안의 폴더 순회
for folder in sorted(os.listdir(IMAGE_DIR)):

    folder_path = os.path.join(IMAGE_DIR, folder)

    if not os.path.isdir(folder_path):
        continue

    images = []

    for file in sorted(os.listdir(folder_path)):

        if file.endswith(IMAGE_EXTENSIONS):

            images.append(file)

    photo_data[folder] = images

# json 저장
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:

    json.dump(
        photo_data,
        f,
        ensure_ascii=False,
        indent=4
    )

print("=" * 50)
print("photos.json 생성 완료!")
print()

for folder, files in photo_data.items():

    print(f"{folder:15} : {len(files)}장")

print("=" * 50)