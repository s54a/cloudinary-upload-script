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
  "AI/Book Fair 3.0 Revised.av1.webm",
  "AI/Book Fair 3.0 Revised.h264.mp4",
  "AI/Book Fair 3.0 Revised.vp9.webm",
  "AI/Freshee Penguin No Tag.av1.webm",
  "AI/Freshee Penguin No Tag.h264.mp4",
  "AI/Freshee Penguin No Tag.vp9.webm",
  "AI/TechXR AI.av1.webm",
  "AI/TechXR AI.h264.mp4",
  "AI/TechXR AI.vp9.webm",
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
  "COMMERCIALS/04 mp4.av1.webm",
  "COMMERCIALS/04 mp4.h264.mp4",
  "COMMERCIALS/04 mp4.vp9.webm",
  "COMMERCIALS/2024_08_25_11_30_IMG_7401.av1.webm",
  "COMMERCIALS/2024_08_25_11_30_IMG_7401.h264.mp4",
  "COMMERCIALS/2024_08_25_11_30_IMG_7401.vp9.webm",
  "COMMERCIALS/bts videomp4.av1.webm",
  "COMMERCIALS/bts videomp4.h264.mp4",
  "COMMERCIALS/bts videomp4.vp9.webm",
  "COMMERCIALS/desert final.av1.webm",
  "COMMERCIALS/desert final.h264.mp4",
  "COMMERCIALS/desert final.vp9.webm",
  "COMMERCIALS/FINL 02mp4.av1.webm",
  "COMMERCIALS/FINL 02mp4.h264.mp4",
  "COMMERCIALS/FINL 02mp4.vp9.webm",
  "COMMERCIALS/Jaswant Thada sunrise.av1.webm",
  "COMMERCIALS/Jaswant Thada sunrise.h264.mp4",
  "COMMERCIALS/Jaswant Thada sunrise.vp9.webm",
  "COMMERCIALS/JOYAASH.av1.webm",
  "COMMERCIALS/JOYAASH.h264.mp4",
  "COMMERCIALS/JOYAASH.vp9.webm",
  "COMMERCIALS/joyassh final.av1.webm",
  "COMMERCIALS/joyassh final.h264.mp4",
  "COMMERCIALS/joyassh final.vp9.webm",
  "COMMERCIALS/Khandari Fall.av1.webm",
  "COMMERCIALS/Khandari Fall.h264.mp4",
  "COMMERCIALS/Khandari Fall.vp9.webm",
  "COMMERCIALS/Madan Mahal.av1.webm",
  "COMMERCIALS/Madan Mahal.h264.mp4",
  "COMMERCIALS/Madan Mahal.vp9.webm",
  "COMMERCIALS/Nidaan Fall.av1.webm",
  "COMMERCIALS/Nidaan Fall.h264.mp4",
  "COMMERCIALS/Nidaan Fall.vp9.webm",
  "COMMERCIALS/nky.av1.webm",
  "COMMERCIALS/nky.h264.mp4",
  "COMMERCIALS/nky.vp9.webm",
  "COMMERCIALS/Overview 2023.av1.webm",
  "COMMERCIALS/Overview 2023.h264.mp4",
  "COMMERCIALS/Overview 2023.vp9.webm",
  "COMMERCIALS/raaga taala reel.av1.webm",
  "COMMERCIALS/raaga taala reel.h264.mp4",
  "COMMERCIALS/raaga taala reel.vp9.webm",
  "COMMERCIALS/reeel 04mp4.av1.webm",
  "COMMERCIALS/reeel 04mp4.h264.mp4",
  "COMMERCIALS/reeel 04mp4.vp9.webm",
  "COMMERCIALS/Shiva Ji Dussehra.av1.webm",
  "COMMERCIALS/Shiva Ji Dussehra.h264.mp4",
  "COMMERCIALS/Shiva Ji Dussehra.vp9.webm",
  "COMMERCIALS/village safari.av1.webm",
  "COMMERCIALS/village safari.h264.mp4",
  "COMMERCIALS/village safari.vp9.webm",
  "COMMERCIALS/yoga video.av1.webm",
  "COMMERCIALS/yoga video.h264.mp4",
  "COMMERCIALS/yoga video.vp9.webm",
  "MUSIC VIDEOS/Namami Devi Narmade.av1.webm",
  "MUSIC VIDEOS/Namami Devi Narmade.h264.mp4",
  "MUSIC VIDEOS/Namami Devi Narmade.vp9.webm",
  "REELS/Bhavesh IS.av1.webm",
  "REELS/Bhavesh IS.h264.mp4",
  "REELS/Bhavesh IS.vp9.webm",
  "REELS/College Placement 4.av1.webm",
  "REELS/College Placement 4.h264.mp4",
  "REELS/College Placement 4.vp9.webm",
  "REELS/Day out @SAM.av1.webm",
  "REELS/Day out @SAM.h264.mp4",
  "REELS/Day out @SAM.vp9.webm",
  "REELS/Diamond Plywood.av1.webm",
  "REELS/Diamond Plywood.h264.mp4",
  "REELS/Diamond Plywood.vp9.webm",
  "REELS/Dr. Joshi Drawing Room.av1.webm",
  "REELS/Dr. Joshi Drawing Room.h264.mp4",
  "REELS/Dr. Joshi Drawing Room.vp9.webm",
  "REELS/FINKART Task.av1.webm",
  "REELS/FINKART Task.h264.mp4",
  "REELS/FINKART Task.vp9.webm",
  "REELS/Inspire 4499--.av1.webm",
  "REELS/Inspire 4499--.h264.mp4",
  "REELS/Inspire 4499--.vp9.webm",
  "REELS/Lavie.av1.webm",
  "REELS/Lavie.h264.mp4",
  "REELS/Lavie.vp9.webm",
  "REELS/Mama Earth.av1.webm",
  "REELS/Mama Earth.h264.mp4",
  "REELS/Mama Earth.vp9.webm",
  "REELS/MAX @199.av1.webm",
  "REELS/MAX @199.h264.mp4",
  "REELS/MAX @199.vp9.webm",
  "REELS/Max 19th Sale.av1.webm",
  "REELS/Max 19th Sale.h264.mp4",
  "REELS/Max 19th Sale.vp9.webm",
  "REELS/MM 99 OFFER.av1.webm",
  "REELS/MM 99 OFFER.h264.mp4",
  "REELS/MM 99 OFFER.vp9.webm",
  "REELS/Nakshatra Nagar @19 lacs - 1.av1.webm",
  "REELS/Nakshatra Nagar @19 lacs - 1.h264.mp4",
  "REELS/Nakshatra Nagar @19 lacs - 1.vp9.webm",
  "REELS/Offer 999.av1.webm",
  "REELS/Offer 999.h264.mp4",
  "REELS/Offer 999.vp9.webm",
  "REELS/Skin care.av1.webm",
  "REELS/Skin care.h264.mp4",
  "REELS/Skin care.vp9.webm",
  "REELS/Slow metabolism-_2.av1.webm",
  "REELS/Slow metabolism-_2.h264.mp4",
  "REELS/Slow metabolism-_2.vp9.webm",
  "REELS/Suta Bombay.av1.webm",
  "REELS/Suta Bombay.h264.mp4",
  "REELS/Suta Bombay.vp9.webm",
  "REELS/TechXR.av1.webm",
  "REELS/TechXR.h264.mp4",
  "REELS/TechXR.vp9.webm",
  "REELS/Trends Women.av1.webm",
  "REELS/Trends Women.h264.mp4",
  "REELS/Trends Women.vp9.webm",
  "REELS/Winter Fest 3.av1.webm",
  "REELS/Winter Fest 3.h264.mp4",
  "REELS/Winter Fest 3.vp9.webm",
  "REELS/Winter Fest Glimpses.av1.webm",
  "REELS/Winter Fest Glimpses.h264.mp4",
  "REELS/Winter Fest Glimpses.vp9.webm",
];

// ---------------- HELPERS ----------------

async function uploadVideo(relativePath) {
  const fullPath = path.join(BASE_DIR, relativePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }

  const normalized = relativePath.replace(/\\/g, "/");

  const folder = path.dirname(normalized); // e.g. "AI" or "CGI & 3D"
  const filename = path.basename(normalized).replace(/\.[^/.]+$/, "");

  return cloudinary.uploader.upload(fullPath, {
    resource_type: "video",
    type: "upload",
    folder: `Cinematic Akash/${folder}`,
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
