import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for recipe images / video thumbnails uploaded via Multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "foodcreator",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4"],
    resource_type: "auto",
    transformation: [{ width: 1600, crop: "limit", quality: "auto" }],
  },
});

export { cloudinary, storage };
