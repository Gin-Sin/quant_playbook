"""Regenerate local scan images. Optional authoring step; not needed to build the site.

Run in a Python virtual environment with pymupdf and pillow installed:
    python scripts/prepare-book.py
"""
from pathlib import Path
import pymupdf
from PIL import Image

book_dir = Path(__file__).resolve().parents[1] / "notes/.vuepress/public/book"
with pymupdf.open(book_dir / "Quant_Playbook.pdf") as document:
    if len(document) != 213:
        raise ValueError("Expected the supplied 213-page edition; check chapter page mapping first.")
    for index, page in enumerate(document):
        pixmap = page.get_pixmap(matrix=pymupdf.Matrix(1.7, 1.7))
        image = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
        image.save(book_dir / f"{index + 1:03}.webp", quality=85)
print("Regenerated 213 original-page images.")
