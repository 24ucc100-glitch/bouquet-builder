"""
Extracts 26 individual flower sprites from a single sprite-sheet image,
using color-distance alpha matting with edge defringing for clean cutouts.

Usage:
    python extract_flowers_hd.py <source_sheet.jpg> [output_dir]

If output_dir is omitted, defaults to ./public/assets/extracted_flowers
relative to the current working directory.
"""

import argparse
import os
import sys

import cv2
import numpy as np

# Grid definitions for the 4 rows of flowers in the sprite sheet.
# Each box is (left, top, right, bottom) as a fraction of image width/height.
FLOWERS = [
    # Row 1: 6 Roses
    {"id": "rose_red", "box": (0.01, 0.01, 0.16, 0.22)},
    {"id": "rose_pink", "box": (0.17, 0.01, 0.32, 0.22)},
    {"id": "rose_cream", "box": (0.33, 0.01, 0.49, 0.22)},
    {"id": "rose_yellow", "box": (0.50, 0.01, 0.66, 0.22)},
    {"id": "rose_purple", "box": (0.67, 0.01, 0.83, 0.22)},
    {"id": "rose_blue", "box": (0.84, 0.01, 0.99, 0.22)},

    # Row 2: 4 Tulips, 2 Lilies, 1 Sunflower
    {"id": "tulip_pink", "box": (0.01, 0.23, 0.14, 0.45)},
    {"id": "tulip_yellow", "box": (0.15, 0.23, 0.27, 0.45)},
    {"id": "tulip_purple", "box": (0.28, 0.23, 0.40, 0.45)},
    {"id": "tulip_red", "box": (0.41, 0.23, 0.53, 0.45)},
    {"id": "lily_white", "box": (0.54, 0.23, 0.69, 0.45)},
    {"id": "lily_pink", "box": (0.70, 0.23, 0.85, 0.45)},
    {"id": "sunflower_golden", "box": (0.86, 0.23, 0.99, 0.45)},

    # Row 3: 2 Peonies, 2 Carnations, 2 Hydrangeas, 1 Gerbera
    {"id": "peony_pink", "box": (0.01, 0.46, 0.15, 0.68)},
    {"id": "peony_cream", "box": (0.16, 0.46, 0.30, 0.68)},
    {"id": "carnation_pink", "box": (0.31, 0.46, 0.44, 0.68)},
    {"id": "carnation_red", "box": (0.45, 0.46, 0.58, 0.68)},
    {"id": "hydrangea_blue", "box": (0.59, 0.46, 0.72, 0.68)},
    {"id": "hydrangea_pink", "box": (0.73, 0.46, 0.86, 0.68)},
    {"id": "gerbera_pink", "box": (0.87, 0.46, 0.99, 0.68)},

    # Row 4: 7 Items
    {"id": "daisy_white", "box": (0.01, 0.69, 0.14, 0.98)},
    {"id": "lavender_purple", "box": (0.15, 0.69, 0.27, 0.98)},
    {"id": "babys_breath_cloud", "box": (0.28, 0.69, 0.41, 0.98)},
    {"id": "chrysanthemum_pink", "box": (0.42, 0.69, 0.55, 0.98)},
    {"id": "orchid_purple", "box": (0.56, 0.69, 0.69, 0.98)},
    {"id": "orchid_white", "box": (0.70, 0.69, 0.84, 0.98)},
    {"id": "ranunculus_pink", "box": (0.85, 0.69, 0.99, 0.98)},
]

# Typical dark studio-background color sample, in BGR (OpenCV order).
BG_COLOR_BGR = np.array([25, 14, 15], dtype=np.float32)

# Feathered alpha matting thresholds
T_LOW = 18.0
T_HIGH = 50.0

PADDING_PX = 4


def extract_sprites(img_path: str, out_dir: str) -> None:
    if not os.path.isfile(img_path):
        print(f"Error: source image not found: {img_path}", file=sys.stderr)
        sys.exit(1)

    os.makedirs(out_dir, exist_ok=True)

    img_bgr = cv2.imread(img_path)
    if img_bgr is None:
        print(f"Error: OpenCV could not read image (unsupported format or corrupt file): {img_path}", file=sys.stderr)
        sys.exit(1)

    h, w, _ = img_bgr.shape

    for item in FLOWERS:
        left = int(item["box"][0] * w)
        top = int(item["box"][1] * h)
        right = int(item["box"][2] * w)
        bottom = int(item["box"][3] * h)

        crop = img_bgr[top:bottom, left:right].astype(np.float32)

        # Color distance to background
        dist = np.sqrt(np.sum((crop - BG_COLOR_BGR) ** 2, axis=2))

        # Feathered alpha matting
        alpha = np.clip((dist - T_LOW) / (T_HIGH - T_LOW), 0.0, 1.0)

        # Defringe: remove dark background contamination from edge pixels
        # F = (C - (1 - alpha) * B) / alpha
        alpha_expanded = np.expand_dims(alpha, axis=2)
        bg_expanded = np.expand_dims(BG_COLOR_BGR, axis=(0, 1))

        alpha_safe = np.maximum(alpha_expanded, 0.01)
        defringed = np.clip(
            (crop - (1.0 - alpha_expanded) * bg_expanded) / alpha_safe, 0.0, 255.0
        )

        # Build 4-channel BGRA image
        bgra = np.zeros((crop.shape[0], crop.shape[1], 4), dtype=np.uint8)
        bgra[:, :, :3] = defringed.astype(np.uint8)
        bgra[:, :, 3] = (alpha * 255.0).astype(np.uint8)

        # Tight crop to non-zero alpha bounding box
        nonzero = np.where(bgra[:, :, 3] > 10)
        if len(nonzero[0]) > 0:
            min_y, max_y = np.min(nonzero[0]), np.max(nonzero[0])
            min_x, max_x = np.min(nonzero[1]), np.max(nonzero[1])

            min_y = max(0, min_y - PADDING_PX)
            max_y = min(bgra.shape[0], max_y + PADDING_PX + 1)
            min_x = max(0, min_x - PADDING_PX)
            max_x = min(bgra.shape[1], max_x + PADDING_PX + 1)

            bgra = bgra[min_y:max_y, min_x:max_x]
        else:
            print(f"Warning: {item['id']} had no foreground pixels detected — check crop box or background color.", file=sys.stderr)

        save_path = os.path.join(out_dir, f"{item['id']}.png")
        cv2.imwrite(save_path, bgra)
        print(f"Ultra-HD Clean Cutout saved: {item['id']} -> {save_path}")

    print(f"HD Smooth Alpha Cutouts finished! ({len(FLOWERS)} sprites)")


def main():
    parser = argparse.ArgumentParser(description="Extract flower sprites from a sprite sheet using alpha matting.")
    parser.add_argument("source", help="Path to the source sprite-sheet image")
    parser.add_argument(
        "output_dir",
        nargs="?",
        default=os.path.join("public", "assets", "extracted_flowers"),
        help="Directory to write extracted sprites to (default: public/assets/extracted_flowers)",
    )
    args = parser.parse_args()
    extract_sprites(args.source, args.output_dir)


if __name__ == "__main__":
    main()