import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

// ---------------- CONFIG ----------------

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Root directory where these folders exist locally
const BASE_DIR = path.resolve("./videos");
// Output JSON file
const OUTPUT_FILE = "cloudinary-upload-results.json";

// ---------------- FILE LIST ----------------

const files = [
  "CGI & 3D/Asanzo.av1.webm",
  "CGI & 3D/Asanzo.h264.mp4",
  "CGI & 3D/Asanzo.vp9.webm",
  "CGI & 3D/Bargi VFX .av1.webm",
  "CGI & 3D/Bargi VFX .h264.mp4",
  "CGI & 3D/Bargi VFX .vp9.webm",
  "CGI & 3D/Bhole Tere Nandii.av1.webm",
  "CGI & 3D/Bhole Tere Nandii.h264.mp4",
  "CGI & 3D/Bhole Tere Nandii.vp9.webm",
  "CGI & 3D/BREAKDOWN.av1.webm",
  "CGI & 3D/BREAKDOWN.h264.mp4",
  "CGI & 3D/BREAKDOWN.vp9.webm",
  "CGI & 3D/Burger.av1.webm",
  "CGI & 3D/Burger.h264.mp4",
  "CGI & 3D/Burger.vp9.webm",
  "CGI & 3D/C02822_3.av1.webm",
  "CGI & 3D/C02822_3.h264.mp4",
  "CGI & 3D/C02822_3.vp9.webm",
  "CGI & 3D/Caratlane.av1.webm",
  "CGI & 3D/Caratlane.h264.mp4",
  "CGI & 3D/Caratlane.vp9.webm",
  "CGI & 3D/Cave Forest.av1.webm",
  "CGI & 3D/Cave Forest.h264.mp4",
  "CGI & 3D/Cave Forest.vp9.webm",
  "CGI & 3D/Chanel.av1.webm",
  "CGI & 3D/Chanel.h264.mp4",
  "CGI & 3D/Chanel.vp9.webm",
  "CGI & 3D/CREAM VFX FINAL.av1.webm",
  "CGI & 3D/CREAM VFX FINAL.h264.mp4",
  "CGI & 3D/CREAM VFX FINAL.vp9.webm",
  "CGI & 3D/freshee cgi 3.av1.webm",
  "CGI & 3D/freshee cgi 3.h264.mp4",
  "CGI & 3D/freshee cgi 3.vp9.webm",
  "CGI & 3D/Ganesh Ji.av1.webm",
  "CGI & 3D/Ganesh Ji.h264.mp4",
  "CGI & 3D/Ganesh Ji.vp9.webm",
  "CGI & 3D/Hanuman_1.av1.webm",
  "CGI & 3D/Hanuman_1.h264.mp4",
  "CGI & 3D/Hanuman_1.vp9.webm",
  "CGI & 3D/Hot Air Ballon.av1.webm",
  "CGI & 3D/Hot Air Ballon.h264.mp4",
  "CGI & 3D/Hot Air Ballon.vp9.webm",
  "CGI & 3D/IMG_6735.av1.webm",
  "CGI & 3D/IMG_6735.h264.mp4",
  "CGI & 3D/IMG_6735.vp9.webm",
  "CGI & 3D/Jagannath ji.av1.webm",
  "CGI & 3D/Jagannath ji.h264.mp4",
  "CGI & 3D/Jagannath ji.vp9.webm",
  "CGI & 3D/Jamtara Sky Replace.av1.webm",
  "CGI & 3D/Jamtara Sky Replace.h264.mp4",
  "CGI & 3D/Jamtara Sky Replace.vp9.webm",
  "CGI & 3D/Krishna.av1.webm",
  "CGI & 3D/Krishna.h264.mp4",
  "CGI & 3D/Krishna.vp9.webm",
  "CGI & 3D/Mahadev Shadow.av1.webm",
  "CGI & 3D/Mahadev Shadow.h264.mp4",
  "CGI & 3D/Mahadev Shadow.vp9.webm",
  "CGI & 3D/Radiantserum.0000.av1.webm",
  "CGI & 3D/Radiantserum.0000.h264.mp4",
  "CGI & 3D/Radiantserum.0000.vp9.webm",
  "CGI & 3D/Ramji.av1.webm",
  "CGI & 3D/Ramji.h264.mp4",
  "CGI & 3D/Ramji.vp9.webm",
  "CGI & 3D/Redbull.av1.webm",
  "CGI & 3D/Redbull.h264.mp4",
  "CGI & 3D/Redbull.vp9.webm",
  "CGI & 3D/Reel.av1.webm",
  "CGI & 3D/Reel.h264.mp4",
  "CGI & 3D/Reel.vp9.webm",
  "CGI & 3D/Shiv.av1.webm",
  "CGI & 3D/Shiv.h264.mp4",
  "CGI & 3D/Shiv.vp9.webm",
  "CGI & 3D/VFX 1.av1.webm",
  "CGI & 3D/VFX 1.h264.mp4",
  "CGI & 3D/VFX 1.vp9.webm",
  "CGI & 3D/Vfx 2.av1.webm",
  "CGI & 3D/Vfx 2.h264.mp4",
  "CGI & 3D/Vfx 2.vp9.webm",
  "CGI & 3D/video.av1.webm",
  "CGI & 3D/video.h264.mp4",
  "CGI & 3D/video.vp9.webm",
  "MUSIC VIDEOS/Namami Devi Narmade.av1.webm",
  "MUSIC VIDEOS/Namami Devi Narmade.h264.mp4",
  "MUSIC VIDEOS/Namami Devi Narmade.vp9.webm",
];

// ---------------- HELPERS ----------------

function safeFolderName(folder) {
  return folder
    .replace(/&/g, "and")
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9/_-]/g, "");
}

async function uploadVideo(relativePath) {
  const fullPath = path.join(BASE_DIR, relativePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }

  const normalized = relativePath.replace(/\\/g, "/");

  const rawFolder = path.dirname(normalized);
  const filename = path.basename(normalized).replace(/\.[^/.]+$/, "");

  const safeFolder = safeFolderName(rawFolder);

  return cloudinary.uploader.upload(fullPath, {
    resource_type: "video",
    type: "upload",
    folder: `Cinematic Akash/${safeFolder}`,
    public_id: filename,
    overwrite: false,
  });
}

// ---------------- MAIN ----------------

async function main() {
  const results = [];
  const errors = [];

  for (const file of files) {
    console.log(`Uploading: ${file}`);
    try {
      const res = await uploadVideo(file);
      results.push(res);
      console.log(`✔ Uploaded → ${res.public_id}`);
    } catch (err) {
      console.error(`✖ Failed → ${file}`);
      errors.push({
        file,
        error: err.message,
      });
    }
  }

  const output = {
    uploaded_at: new Date().toISOString(),
    total_files: files.length,
    success: results.length,
    failed: errors.length,
    results,
    errors,
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  console.log(`\nDone. Results saved to ${OUTPUT_FILE}`);
}

main().catch(console.error);
