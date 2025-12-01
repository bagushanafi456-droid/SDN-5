#!/usr/bin/env python3
import json
import os
from pathlib import Path

GALERI_PATH = Path("asset/galeri")

def get_categories():
    """Ambil semua kategori dari folder asset/galeri"""
    categories = {}
    
    if not GALERI_PATH.exists():
        return categories
    
    for category_dir in GALERI_PATH.iterdir():
        if category_dir.is_dir():
            category_name = category_dir.name
            subfolders = []
            
            for subfolder in category_dir.iterdir():
                if subfolder.is_dir():
                    # Hitung jumlah gambar
                    images = list(subfolder.glob("*.jpg")) + list(subfolder.glob("*.png")) + list(subfolder.glob("*.jpeg"))
                    subfolders.append({
                        "name": subfolder.name,
                        "display_name": subfolder.name.replace("-", " ").title(),
                        "path": str(subfolder).replace("\\", "/"),
                        "image_count": len(images)
                    })
            
            categories[category_name] = sorted(subfolders, key=lambda x: x["name"])
    
    return categories

def get_images(subfolder_path):
    """Ambil semua gambar dari subfolder tertentu"""
    folder = GALERI_PATH / subfolder_path
    
    if not folder.exists():
        return []
    
    images = []
    for ext in ["*.jpg", "*.png", "*.jpeg", "*.webp"]:
        for img_file in folder.glob(ext):
            images.append({
                "filename": img_file.name,
                "path": str(img_file).replace("\\", "/"),
                "size": img_file.stat().st_size
            })
    
    return sorted(images, key=lambda x: x["filename"])

if __name__ == "__main__":
    print(json.dumps(get_categories(), indent=2))
