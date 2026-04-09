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
const BASE_DIR = path.resolve("./assets");
// Output JSON file
const OUTPUT_FILE = "cloudinary-upload-results.json";

// ---------------- FILE LIST ----------------

const files = ["Folder/file.webp"];

// ---------------- HELPERS ----------------

// function safeFolderName(folder) {
//   return folder
//     .trim()
//     .replace(/&/g, "and")
//     .replace(/\s+/g, "_")
//     .replace(/[^a-zA-Z0-9/_-]/g, "");
// }

// function sanitizePublicId(name) {
//   return name
//     .trim() // remove leading/trailing spaces
//     .replace(/\s+/g, "_") // spaces → underscore
//     .replace(/[^a-zA-Z0-9_-]/g, ""); // remove junk chars
// }

// // async function uploadVideo(relativePath) {
// //   const fullPath = path.join(BASE_DIR, relativePath);

// //   if (!fs.existsSync(fullPath)) {
// //     throw new Error(`File not found: ${fullPath}`);
// //   }

// //   const normalized = relativePath.replace(/\\/g, "/");

// //   const rawFolder = path.dirname(normalized);
// //   const filename = path.basename(normalized).replace(/\.[^/.]+$/, "");

// //   const safeFolder = safeFolderName(rawFolder);

// //   return cloudinary.uploader.upload(fullPath, {
// //     resource_type: "video",
// //     type: "upload",
// //     folder: `new_folder/${safeFolder}`,
// //     public_id: filename,
// //     overwrite: false,
// //   });
// // }

// // ---------------- MAIN ----------------

// // async function main() {
// //   const results = [];
// //   const errors = [];

// //   for (const file of files) {
// //     console.log(`Uploading: ${file}`);
// //     try {
// //       const res = await uploadVideo(file);
// //       results.push(res);
// //       console.log(`✔ Uploaded → ${res.public_id}`);
// //     } catch (err) {
// //       console.error(`✖ Failed → ${file}`);
// //       errors.push({
// //         file,
// //         error: err.message,
// //       });
// //     }
// //   }

// //   const output = {
// //     uploaded_at: new Date().toISOString(),
// //     total_files: files.length,
// //     success: results.length,
// //     failed: errors.length,
// //     results,
// //     errors,
// //   };

// //   fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
// //   console.log(`\nDone. Results saved to ${OUTPUT_FILE}`);
// // }

// // main().catch(console.error);

// async function uploadToCloudinary(relativePath, resourceType = "auto") {
//   const fullPath = path.join(BASE_DIR, relativePath);

//   if (!fs.existsSync(fullPath)) {
//     throw new Error(`File not found: ${fullPath}`);
//   }

//   const normalized = relativePath.replace(/\\/g, "/");

//   const rawFolder = path.dirname(normalized);
//   const rawName = path.basename(normalized).replace(/\.[^/.]+$/, "");
//   const filename = sanitizePublicId(rawName);

//   const safeFolder = safeFolderName(rawFolder);

//   return cloudinary.uploader.upload(fullPath, {
//     resource_type: resourceType, // "video" or "image" or "auto"
//     folder: `folder/${safeFolder}`,
//     public_id: filename,
//     overwrite: false,
//   });
// }

// async function processItems(items) {
//   const results = [];
//   const errors = [];

//   for (const item of items) {
//     console.log(`Uploading: ${item.video}`);

//     try {
//       const [videoRes, thumbRes] = await Promise.all([
//         uploadToCloudinary(item.video, "video"),
//         uploadToCloudinary(item.thumbnail, "image"),
//       ]);

//       const updatedItem = {
//         ...item,
//         video: videoRes.secure_url,
//         thumbnail: thumbRes.secure_url,
//       };

//       results.push(updatedItem);

//       console.log(`✔ Uploaded → ${videoRes.public_id}`);
//     } catch (err) {
//       console.error(`✖ Failed → ${item.video}`);
//       errors.push({
//         item,
//         error: err.message,
//       });
//     }
//   }

//   const output = {
//     uploaded_at: new Date().toISOString(),
//     total_items: items.length,
//     success: results.length,
//     failed: errors.length,
//     results,
//     errors,
//   };

//   fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

//   console.log(`\nDone. Results saved to ${OUTPUT_FILE}`);
// }

// processItems(files).catch(console.error);

// ---------------- HELPERS ----------------

function safeFolderName(folder) {
  return folder
    .trim()
    .replace(/&/g, "and")
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9/_-]/g, "");
}

function sanitizePublicId(name) {
  return name
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_-]/g, "");
}

/** Derives a human-readable category from the folder name */
function folderToCategory(folderName) {
  return folderName.trim().replace(/_/g, " ").toLowerCase();
}

/** Computes aspect ratio string like "16:9", "4:3", "1:1", etc. */
function computeRatio(width, height) {
  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}

async function uploadImage(relativePath) {
  const fullPath = path.join(BASE_DIR, relativePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }

  const normalized = relativePath.replace(/\\/g, "/");
  const rawFolder = path.dirname(normalized); // e.g. "Visiting Card"
  const rawName = path.basename(normalized).replace(/\.[^/.]+$/, "");

  const safeFolder = safeFolderName(rawFolder);
  const filename = sanitizePublicId(rawName);

  const result = await cloudinary.uploader.upload(fullPath, {
    resource_type: "image",
    folder: `folder/${safeFolder}`,
    public_id: filename,
    overwrite: false,
  });

  return { result, rawFolder };
}

// ---------------- MAIN ----------------

async function processImages(filePaths) {
  const results = [];
  const errors = [];

  for (const relativePath of filePaths) {
    console.log(`Uploading: ${relativePath}`);

    try {
      const { result, rawFolder } = await uploadImage(relativePath);

      const width = result.width;
      const height = result.height;

      const item = {
        src: result.secure_url,
        category: folderToCategory(rawFolder), // "Visiting Card" → "visiting card"
        height,
        width,
        ratio: computeRatio(width, height),
        filesizeInBytes: result.bytes,
      };

      results.push(item);
      console.log(`✔ Uploaded → ${result.public_id}`);
    } catch (err) {
      console.error(`✖ Failed → ${relativePath}: ${err.message}`);
      errors.push({ file: relativePath, error: err.message });
    }
  }

  // Save full output for debugging
  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(
      {
        uploaded_at: new Date().toISOString(),
        total: filePaths.length,
        success: results.length,
        failed: errors.length,
        results,
        errors,
      },
      null,
      2,
    ),
  );

  console.log(`\nDone. Results saved to ${OUTPUT_FILE}`);
  console.log("\nArray for use in your app:");
  console.log(JSON.stringify(results, null, 2));

  return results;
}

processImages(files).catch(console.error);
