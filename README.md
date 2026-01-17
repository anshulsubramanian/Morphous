# Figma Assets Downloader

A Python script to download all image resources from a Figma design file.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Get your Figma API token:
   - Go to https://www.figma.com/developers/api#access-tokens
   - Generate a personal access token

## Usage

### Basic usage:
```bash
python download_figma_assets.py --token YOUR_FIGMA_TOKEN --file FILE_ID
```

### With Figma URL:
```bash
python download_figma_assets.py --token YOUR_FIGMA_TOKEN --file "https://www.figma.com/file/FILE_ID/Design-Name"
```

### Custom output directory:
```bash
python download_figma_assets.py --token YOUR_FIGMA_TOKEN --file FILE_ID --output my_assets
```

## Examples

```bash
# Using file ID
python download_figma_assets.py --token abc123xyz --file xyz789abc

# Using full URL
python download_figma_assets.py --token abc123xyz --file "https://www.figma.com/file/xyz789abc/My-Design"

# Custom output folder
python download_figma_assets.py --token abc123xyz --file xyz789abc --output figma_assets
```

## How it works

The script performs two main tasks:

1. **Individual Image Assets**: 
   - Scans the design for nodes with image fills (embedded images)
   - Extracts and downloads each unique image asset
   - Saves them to `assets/images/` folder

2. **Frame Screenshots**:
   - Finds all frames, components, and instances
   - Exports them as screenshots
   - Saves them to `assets/frames/` folder

## Output Structure

```
assets/
├── images/          # Individual image assets (JPG, PNG, SVG)
└── frames/          # Frame/component screenshots (PNG)
```

## Notes

- Frame screenshots are downloaded at 2x resolution for better quality
- Individual images maintain their original format (JPG, PNG, SVG)
- Filenames are sanitized to be filesystem-safe
- The script handles up to 100 nodes per API request (batches automatically)
- Duplicate filenames are automatically numbered to avoid overwrites

