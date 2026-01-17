#!/usr/bin/env python3
"""
Figma Assets Downloader

This script downloads all image resources from a Figma design file.
Usage:
    python download_figma_assets.py --token YOUR_FIGMA_TOKEN --file FILE_ID_OR_URL
"""

import argparse
import os
import re
import requests
import json
from pathlib import Path
from typing import List, Dict, Optional
from urllib.parse import urlparse, parse_qs


class FigmaAssetDownloader:
    """Downloads assets from a Figma design file."""
    
    def __init__(self, token: str):
        self.token = token
        self.base_url = "https://api.figma.com/v1"
        self.headers = {
            "X-Figma-Token": token
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)
    
    def extract_file_id(self, file_input: str) -> str:
        """Extract file ID from Figma URL or return as-is if it's already an ID."""
        # Check if it's a URL
        if file_input.startswith("http"):
            # Extract file ID from Figma URL
            # Format: https://www.figma.com/file/FILE_ID/... or /design/FILE_ID/...
            match = re.search(r'/(?:file|design)/([a-zA-Z0-9]+)', file_input)
            if match:
                return match.group(1)
            raise ValueError("Could not extract file ID from URL")
        # Assume it's already a file ID
        return file_input
    
    def get_file_data(self, file_id: str, include_images: bool = True) -> Dict:
        """Fetch the Figma file data."""
        url = f"{self.base_url}/files/{file_id}"
        # Request full file data - don't set depth limit to get all nodes
        # The API will return all nodes by default, but we can request specific data
        params = {}
        response = self.session.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        
        return data
    
    def get_image_urls(self, file_id: str, node_ids: List[str]) -> Dict[str, str]:
        """Get image URLs for given node IDs."""
        # Figma API allows up to 100 node IDs per request
        url = f"{self.base_url}/images/{file_id}"
        all_image_urls = {}
        
        # Process in batches of 100
        for i in range(0, len(node_ids), 100):
            batch = node_ids[i:i+100]
            params = {
                "ids": ",".join(batch),
                "format": "png",
                "scale": 2  # 2x resolution for better quality
            }
            response = self.session.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            all_image_urls.update(data.get("images", {}))
        
        return all_image_urls
    
    def find_image_fills(self, node: Dict, image_assets: List[Dict]) -> None:
        """Recursively find all nodes with image fills (individual image assets)."""
        node_type = node.get("type", "")
        node_id = node.get("id")
        node_name = node.get("name", "unnamed")
        
        # Check if this is an IMAGE node type (some images are stored as separate nodes)
        if node_type == "IMAGE":
            # IMAGE nodes have a different structure - they might have imageHash
            image_hash = node.get("imageHash")
            if image_hash:
                image_assets.append({
                    "imageRef": image_hash,
                    "nodeId": node_id,
                    "nodeName": node_name,
                    "nodeType": node_type
                })
        
        # Check for image fills in fills array
        fills = node.get("fills", [])
        if fills:
            for fill in fills:
                if fill.get("type") == "IMAGE":
                    # Image fills can have imageRef or imageHash
                    image_ref = fill.get("imageRef") or fill.get("imageHash")
                    if image_ref:
                        image_assets.append({
                            "imageRef": image_ref,
                            "nodeId": node_id,
                            "nodeName": node_name,
                            "nodeType": node_type
                        })
        
        # Check for background fills (some frames have image backgrounds)
        background_fills = node.get("background", [])
        if background_fills:
            for fill in background_fills:
                if isinstance(fill, dict) and fill.get("type") == "IMAGE":
                    image_ref = fill.get("imageRef") or fill.get("imageHash")
                    if image_ref:
                        image_assets.append({
                            "imageRef": image_ref,
                            "nodeId": node_id,
                            "nodeName": node_name,
                            "nodeType": node_type
                        })
        
        # Check for effects that might contain images (like image shadows)
        effects = node.get("effects", [])
        if effects:
            for effect in effects:
                if isinstance(effect, dict) and effect.get("type") == "DROP_SHADOW":
                    # Some effects might reference images, though rare
                    pass
        
        # Recursively process children (always traverse, even for containers)
        children = node.get("children", [])
        for child in children:
            # Always traverse children, even if this node is a container
            self.find_image_fills(child, image_assets)
    
    def get_image_fill_urls(self, file_data: Dict, image_refs: List[str]) -> Dict[str, str]:
        """Get download URLs for image fills from file data."""
        # Figma stores image URLs in the file data under "images" key
        # The images object maps imageRef (hash) to the actual image URL
        images = file_data.get("images", {})
        
        if not images:
            print("  ⚠️  Warning: No 'images' object found in file data")
            print(f"     File data keys: {list(file_data.keys())}")
        
        # Filter to only return URLs for the image_refs we're looking for
        result = {}
        found_count = 0
        for image_ref in image_refs:
            if image_ref in images:
                result[image_ref] = images[image_ref]
                found_count += 1
            else:
                # Try partial match (sometimes the ref might be slightly different)
                for key, url in images.items():
                    if image_ref in key or key in image_ref:
                        result[image_ref] = url
                        found_count += 1
                        break
        
        if found_count < len(image_refs):
            missing = len(image_refs) - found_count
            print(f"  ⚠️  Warning: {missing} image reference(s) not found in file data")
            print(f"     Looking for {len(image_refs)} images, found {found_count}")
            if images:
                print(f"     Available image keys (first 5): {list(images.keys())[:5]}")
                print(f"     Missing refs (first 5): {[ref for ref in image_refs if ref not in result][:5]}")
        
        return result
    
    def find_image_nodes(self, node: Dict, image_nodes: List[Dict], export_all: bool = True) -> None:
        """Recursively find all nodes that can be exported as images."""
        node_type = node.get("type", "")
        
        # Skip certain node types that are usually containers
        skip_types = ["DOCUMENT", "CANVAS", "PAGE"]
        
        # Nodes that can be exported as images
        exportable_types = [
            "FRAME", "COMPONENT", "INSTANCE", "GROUP", 
            "VECTOR", "BOOLEAN_OPERATION", "STAR", "LINE", 
            "ELLIPSE", "REGULAR_POLYGON", "RECTANGLE", "TEXT"
        ]
        
        if node_type in exportable_types:
            # If export_all is True, export all frames, components, instances, and groups
            # Otherwise, only export nodes with explicit export settings
            should_export = False
            
            if export_all:
                # Export all frames, components, instances, and groups (but not individual shapes unless they're top-level)
                if node_type in ["FRAME", "COMPONENT", "INSTANCE", "GROUP"]:
                    should_export = True
                # Also export if it has explicit export settings
                elif node.get("exportSettings"):
                    should_export = True
            else:
                # Only export if it has export settings or is a component/instance
                if node.get("exportSettings") or node_type in ["COMPONENT", "INSTANCE"]:
                    should_export = True
            
            if should_export and node_type not in skip_types:
                # Skip nodes that are likely just containers (no visual content)
                # Check if node has visible property set to False
                if node.get("visible", True):  # Default to True if not specified
                    image_nodes.append({
                        "id": node.get("id"),
                        "name": node.get("name", "unnamed"),
                        "type": node_type
                    })
        
        # Recursively process children (always traverse, even for containers)
        children = node.get("children", [])
        for child in children:
            # Always traverse children, even if this node is a container
            self.find_image_nodes(child, image_nodes, export_all)
    
    def download_image(self, url: str, filepath: Path) -> None:
        """Download an image from URL to filepath."""
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        filepath.parent.mkdir(parents=True, exist_ok=True)
        
        with open(filepath, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
    
    def sanitize_filename(self, filename: str) -> str:
        """Sanitize filename to be filesystem-safe."""
        # Remove or replace invalid characters
        filename = re.sub(r'[<>:"/\\|?*]', '_', filename)
        # Remove leading/trailing spaces and dots
        filename = filename.strip(' .')
        # Limit length
        if len(filename) > 200:
            filename = filename[:200]
        return filename or "unnamed"
    
    def download_assets(self, file_id: str, output_dir: str = "assets", export_all: bool = True) -> None:
        """Main method to download all assets from a Figma file."""
        print(f"Fetching Figma file data for {file_id}...")
        file_data = self.get_file_data(file_id, include_images=True)
        
        document = file_data.get("document", {})
        file_name = file_data.get("name", "figma_design")
        
        print(f"File: {file_name}")
        
        # Debug: Check document structure
        if not document:
            print("⚠️  Warning: No 'document' key found in file data")
            print(f"Available keys: {list(file_data.keys())}")
            return
        
        # Check if document has children
        doc_children = document.get("children", [])
        print(f"Document has {len(doc_children)} top-level children")
        
        # Create output directories
        output_path = Path(output_dir)
        frames_path = output_path / "frames"
        images_path = output_path / "images"
        frames_path.mkdir(parents=True, exist_ok=True)
        images_path.mkdir(parents=True, exist_ok=True)
        
        # Initialize counters
        images_downloaded = 0
        images_failed = 0
        frames_downloaded = 0
        frames_failed = 0
        
        # ===== STEP 1: Find and download individual image assets =====
        print("\n" + "="*60)
        print("STEP 1: Finding individual image assets...")
        print("="*60)
        
        image_assets = []
        self.find_image_fills(document, image_assets)
        
        if image_assets:
            print(f"Found {len(image_assets)} nodes with image fills/images")
            
            # Show breakdown by node type
            type_counts = {}
            for asset in image_assets:
                node_type = asset["nodeType"]
                type_counts[node_type] = type_counts.get(node_type, 0) + 1
            print("Breakdown by node type:")
            for node_type, count in sorted(type_counts.items()):
                print(f"  - {node_type}: {count}")
            
            # Get unique image references
            unique_image_refs = list(set([asset["imageRef"] for asset in image_assets if asset["imageRef"]]))
            print(f"\nFound {len(unique_image_refs)} unique image references")
            
            if not unique_image_refs:
                print("  ⚠️  No image references found. Checking file data structure...")
                # Debug: show what's in file_data
                if "images" in file_data:
                    print(f"  File data contains 'images' key with {len(file_data['images'])} entries")
                else:
                    print("  File data does not contain 'images' key")
                    print(f"  Available keys: {list(file_data.keys())}")
            
            # Get image URLs from file data
            print("\nExtracting image URLs from file data...")
            image_urls = self.get_image_fill_urls(file_data, unique_image_refs)
            
            if image_urls:
                print(f"\nDownloading {len(image_urls)} individual images to {images_path}...")
                
                for image_ref, image_url in image_urls.items():
                    if not image_url:
                        continue
                    
                    # Find the first node that uses this image for naming
                    asset_info = next((a for a in image_assets if a["imageRef"] == image_ref), None)
                    if asset_info:
                        safe_name = self.sanitize_filename(asset_info["nodeName"])
                    else:
                        safe_name = "image"
                    
                    # Determine file extension from URL or use default
                    file_ext = "png"
                    if ".jpg" in image_url.lower() or ".jpeg" in image_url.lower():
                        file_ext = "jpg"
                    elif ".svg" in image_url.lower():
                        file_ext = "svg"
                    
                    filename = f"{safe_name}_{image_ref[:8]}.{file_ext}"
                    filepath = images_path / filename
                    
                    # Avoid duplicates
                    if filepath.exists():
                        counter = 1
                        base_name = filepath.stem
                        while filepath.exists():
                            filename = f"{base_name}_{counter}.{file_ext}"
                            filepath = images_path / filename
                            counter += 1
                    
                    try:
                        print(f"  📥 Downloading image: {safe_name}...")
                        self.download_image(image_url, filepath)
                        images_downloaded += 1
                        print(f"     ✓ Saved to {filepath}")
                    except Exception as e:
                        print(f"     ✗ Failed to download {safe_name}: {e}")
                        images_failed += 1
                
                print(f"\n✅ Individual images: {images_downloaded} downloaded, {images_failed} failed")
            else:
                print("No image URLs returned from Figma API for image fills.")
        else:
            print("No individual image assets found.")
        
        # ===== STEP 2: Export individual nodes with images as separate assets =====
        print("\n" + "="*60)
        print("STEP 2: Exporting individual nodes with images...")
        print("="*60)
        
        # Find nodes that contain images and export them individually
        nodes_with_images = []
        for asset in image_assets:
            node_id = asset["nodeId"]
            # Only export if it's not a frame (frames are handled in step 3)
            # We'll export individual shapes/elements that have images
            nodes_with_images.append({
                "id": node_id,
                "name": asset["nodeName"],
                "type": asset["nodeType"]
            })
        
        if nodes_with_images:
            # Remove duplicates
            seen_ids = set()
            unique_nodes = []
            for node in nodes_with_images:
                if node["id"] not in seen_ids:
                    seen_ids.add(node["id"])
                    unique_nodes.append(node)
            
            print(f"Found {len(unique_nodes)} individual nodes with images to export")
            
            # Get image URLs for these nodes
            node_ids = [node["id"] for node in unique_nodes]
            print("Fetching image URLs for individual nodes...")
            individual_image_urls = self.get_image_urls(file_id, node_ids)
            
            if individual_image_urls:
                print(f"\nDownloading {len(individual_image_urls)} individual node images to {images_path}...")
                
                for node in unique_nodes:
                    node_id = node["id"]
                    if node_id not in individual_image_urls:
                        continue
                    
                    image_url = individual_image_urls[node_id]
                    if not image_url:
                        continue
                    
                    safe_name = self.sanitize_filename(node["name"])
                    filename = f"{safe_name}_node_{node_id[:8]}.png"
                    filepath = images_path / filename
                    
                    # Avoid duplicates
                    if filepath.exists():
                        counter = 1
                        base_name = filepath.stem
                        while filepath.exists():
                            filename = f"{base_name}_{counter}.png"
                            filepath = images_path / filename
                            counter += 1
                    
                    try:
                        print(f"  📥 Downloading node image: {safe_name}...")
                        self.download_image(image_url, filepath)
                        images_downloaded += 1
                        print(f"     ✓ Saved to {filepath}")
                    except Exception as e:
                        print(f"     ✗ Failed to download {safe_name}: {e}")
                        images_failed += 1
            else:
                print("No image URLs returned for individual nodes.")
        else:
            print("No individual nodes with images found to export separately.")
        
        # ===== STEP 3: Find and download frame screenshots =====
        print("\n" + "="*60)
        print("STEP 3: Finding frames and components to export...")
        print("="*60)
        
        image_nodes = []
        self.find_image_nodes(document, image_nodes, export_all)
        
        if not image_nodes:
            print("No exportable frames/components found in the design.")
            print("\nDebug: Analyzing document structure...")
            # Debug: show full structure
            def debug_nodes(node, depth=0, max_depth=5, max_children=10):
                if depth > max_depth:
                    return
                node_type = node.get("type", "UNKNOWN")
                node_name = node.get("name", "unnamed")
                node_id = node.get("id", "no-id")
                indent = "  " * depth
                print(f"{indent}- {node_type}: {node_name} (id: {node_id[:8]})")
                
                children = node.get("children", [])
                if children:
                    print(f"{indent}  [has {len(children)} children]")
                    for i, child in enumerate(children[:max_children]):
                        debug_nodes(child, depth + 1, max_depth, max_children)
                    if len(children) > max_children:
                        print(f"{indent}  ... and {len(children) - max_children} more children")
            
            print("Full document structure:")
            debug_nodes(document, max_depth=4, max_children=20)
            
            # Also try to find ANY nodes regardless of type
            all_nodes = []
            def collect_all_nodes(node, node_list):
                node_list.append({
                    "type": node.get("type", "UNKNOWN"),
                    "name": node.get("name", "unnamed"),
                    "id": node.get("id", "no-id")
                })
                for child in node.get("children", []):
                    collect_all_nodes(child, node_list)
            
            collect_all_nodes(document, all_nodes)
            print(f"\nTotal nodes found in document: {len(all_nodes)}")
            if all_nodes:
                print("Node types found:")
                type_counts = {}
                for node in all_nodes:
                    node_type = node["type"]
                    type_counts[node_type] = type_counts.get(node_type, 0) + 1
                for node_type, count in sorted(type_counts.items(), key=lambda x: -x[1]):
                    print(f"  - {node_type}: {count}")
            
            if not image_assets:
                return
        
        print(f"Found {len(image_nodes)} exportable frames/components")
        
        # Show breakdown by type
        type_counts = {}
        for node in image_nodes:
            node_type = node["type"]
            type_counts[node_type] = type_counts.get(node_type, 0) + 1
        
        print("Breakdown by type:")
        for node_type, count in sorted(type_counts.items()):
            print(f"  - {node_type}: {count}")
        
        # Get node IDs
        node_ids = [node["id"] for node in image_nodes]
        
        print("\nFetching frame screenshot URLs from Figma...")
        image_urls = self.get_image_urls(file_id, node_ids)
        
        if not image_urls:
            print("No image URLs returned from Figma API for frames.")
        else:
            print(f"\nDownloading {len(image_urls)} frame screenshots to {frames_path}...")
            
            for node in image_nodes:
                node_id = node["id"]
                if node_id not in image_urls:
                    print(f"  ⚠️  Skipping {node['name']} - no image URL available")
                    continue
                
                image_url = image_urls[node_id]
                if not image_url:
                    print(f"  ⚠️  Skipping {node['name']} - empty image URL")
                    continue
                
                # Create filename
                safe_name = self.sanitize_filename(node["name"])
                filename = f"{safe_name}_{node_id[:8]}.png"
                filepath = frames_path / filename
                
                try:
                    print(f"  📥 Downloading frame: {safe_name}...")
                    self.download_image(image_url, filepath)
                    frames_downloaded += 1
                    print(f"     ✓ Saved to {filepath}")
                except Exception as e:
                    print(f"     ✗ Failed to download {safe_name}: {e}")
                    frames_failed += 1
            
            print(f"\n✅ Frame screenshots: {frames_downloaded} downloaded, {frames_failed} failed")
        
        # ===== SUMMARY =====
        print("\n" + "="*60)
        print("📊 SUMMARY")
        print("="*60)
        total_downloaded = images_downloaded + frames_downloaded
        total_failed = images_failed + frames_failed
        print(f"✅ Total assets downloaded: {total_downloaded}")
        if total_failed > 0:
            print(f"⚠️  Failed downloads: {total_failed}")
        print(f"\n📁 Assets organized in:")
        print(f"   - Frames: {frames_path}")
        print(f"   - Individual images: {images_path}")


def main():
    parser = argparse.ArgumentParser(
        description="Download all assets from a Figma design file",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python download_figma_assets.py --token abc123 --file xyz789
  python download_figma_assets.py --token abc123 --file https://www.figma.com/file/xyz789/Design
  python download_figma_assets.py --token abc123 --file xyz789 --output my_assets
        """
    )
    
    parser.add_argument(
        "--token",
        required=True,
        help="Your Figma API token (get it from https://www.figma.com/developers/api#access-tokens)"
    )
    
    parser.add_argument(
        "--file",
        required=True,
        help="Figma file ID or full Figma URL"
    )
    
    parser.add_argument(
        "--output",
        default="assets",
        help="Output directory for downloaded assets (default: assets)"
    )
    
    parser.add_argument(
        "--export-all",
        action="store_true",
        default=True,
        help="Export all frames, components, and instances (default: True)"
    )
    
    parser.add_argument(
        "--export-only-marked",
        action="store_true",
        help="Only export nodes with explicit export settings in Figma"
    )
    
    args = parser.parse_args()
    
    # Determine export mode
    export_all = not args.export_only_marked
    
    try:
        downloader = FigmaAssetDownloader(args.token)
        file_id = downloader.extract_file_id(args.file)
        downloader.download_assets(file_id, args.output, export_all)
    except requests.exceptions.HTTPError as e:
        print(f"❌ HTTP Error: {e}")
        if e.response.status_code == 403:
            print("   This might be due to an invalid token or insufficient permissions.")
        elif e.response.status_code == 404:
            print("   File not found. Please check the file ID or URL.")
        else:
            print(f"   Response: {e.response.text}")
        exit(1)
    except Exception as e:
        print(f"❌ Error: {e}")
        exit(1)


if __name__ == "__main__":
    main()

