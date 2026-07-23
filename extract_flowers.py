"""
Extracts 26 individual flower sprites from a single sprite-sheet image,
using simple color-distance background keying.

Usage:
    python extract_flowers.py <source_sheet.jpg> [output_dir]

If output_dir is omitted, defaults to ./public/assets/extracted_flowers
relative to the current working directory.

Note: for cleaner edges (feathered alpha + defringing) prefer
extract_flowers_hd.py, which uses proper alpha matting instead of the
hard threshold used here.
"""

import argparse
import os
import sys

from PIL import Image
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

    # Row 4: 7 Items (Daisy, Lavender, Baby's Breath, Chrysanthemum, 2 Orchids, Ranunculus)
    {"id": "daisy_white", "box": (0.01, 0.69, 0.14, 0.98)},
    {"id": "lavender_purple", "box": (0.15, 0.69, 0.27, 0.98)},
    {"id": "babys_breath_cloud", "box": (0.28, 0.69, 0.41, 0.98)},
    {"id": "chrysanthemum_pink", "box": (0.42, 0.69, 0.55, 0.98)},
    {"id": "orchid_purple", "box": (0.56, 0.69, 0.69, 0.98)},
    {"id": "orchid_white", "box": (0.70, 0.69, 0.84, 0.98)},
    {"id": "ranunculus_pink", "box": (0.85, 0.69, 0.99, 0.98)},
]

# Background color thresholds and feather band, so the cutout edge fades
# smoothly instead of a hard black/white cutoff (which causes jagged edges
# and dark fringing around petals).
BG_THRESHOLD_LOW = 35.0   # fully background below this distance
BG_THRESHOLD_HIGH = 55.0  # fully foreground above this distance


def extract_sprites(img_path: str, out_dir: str) -> None:
    if not os.path.isfile(img_path):
        print(f"Error: source image not found: {img_path}", file=sys.stderr)
        sys.exit(1)

    os.makedirs(out_dir, exist_ok=True)

    img = Image.open(img_path).convert("RGBA")
    w, h = img.size

    for item in FLOWERS:
        left = int(item["box"][0] * w)
        top = int(item["box"][1] * h)
        right = int(item["box"][2] * w)
        bottom = int(item["box"][3] * h)

        crop = img.crop((left, top, right, bottom))
        arr = np.array(crop).astype(np.float32)

        r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]

        # Distance from a dark studio-background color, used to build a
        # soft alpha mask instead of a hard in/out cutoff.
        dist = np.sqrt(r ** 2 + g ** 2 + (b - 10) ** 2)
        alpha = np.clip(
            (dist - BG_THRESHOLD_LOW) / (BG_THRESHOLD_HIGH - BG_THRESHOLD_LOW),
            0.0,
            1.0,
        )

        arr[:, :, 3] = alpha * 255.0

        result = Image.fromarray(arr.astype(np.uint8))
        save_path = os.path.join(out_dir, f"{item['id']}.png")
        result.save(save_path)
        print(f"Extracted {item['id']} -> {save_path}")

    print(f"All {len(FLOWERS)} flower sprites successfully extracted!")


def main():
    parser = argparse.ArgumentParser(description="Extract flower sprites from a sprite sheet.")
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
