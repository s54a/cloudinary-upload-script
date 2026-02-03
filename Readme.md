# Cloudinary Video Upload Script

A Node.js script to bulk-upload videos to Cloudinary while:

- Preserving local folder structure
- Uploading videos as `resource_type: video`
- Sanitizing folder names for Cloudinary safety
- Saving **full Cloudinary responses** (URLs, public_id, metadata, etc.) into a JSON file

---

## Requirements

- **Node.js 18+** (LTS recommended)
- A Cloudinary account with API credentials

> This script is intended to be run with **Node.js**, bun gives some error feel free to raise a pr to fix this.

---

## Setup

### 1. Install dependencies

```bash
npm install
```

or

```bash
pnpm install
```

or

```bash
bun install
```

---

### 2. Create `.env` file

In the project root:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### 3. Project structure

```text
cloudinary-upload-script/
├── index.js
├── package.json
├── .env
├── videos/
│   ├── AI/
│   ├── CGI & 3D/
│   ├── COMMERCIALS/
│   └── ...
```

All video paths in the script are **relative to the `videos/` directory**.

---

## Running the script (Node.js)

```bash
node index.js
```

---

## What the script does

- Reads a predefined list of video files
- Uploads each file using **signed uploads**
- Converts folder names into Cloudinary-safe paths
  - Example: `CGI & 3D` → `CGI_and_3D`

- Uploads videos into matching Cloudinary folders
- Writes results to:

```text
cloudinary-upload-results.json
```

---

## Output JSON structure

```json
{
  "uploaded_at": "2026-02-03T14:39:03.237Z",
  "total_files": 3,
  "success": 3,
  "failed": 0,
  "results": [
    {
      "asset_id": "...",
      "public_id": "CGI_and_3D/Burger.h264",
      "secure_url": "https://res.cloudinary.com/...",
      "duration": 12.3,
      "bytes": 12345678
    }
  ],
  "errors": []
}
```

---

## Important notes

- Folder names are **sanitized** before upload
  Cloudinary does **not reliably support characters like `&`, `%`, `?`, `#`** in folder paths.
- The script uses **signed uploads**
  No upload presets are required.
- Existing assets are **not overwritten** unless explicitly changed.

---

## MIT License
