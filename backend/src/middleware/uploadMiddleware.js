import multer from "multer";
import { storage } from "../config/cloudinary.js";

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|mp4/;
    const isValid = allowed.test(file.mimetype);
    if (isValid) return cb(null, true);
    cb(new Error("Only image (jpg, png, webp) or mp4 video files are allowed"));
  },
});

export default upload;
