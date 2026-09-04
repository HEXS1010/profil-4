import { Router } from "express";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { uploadsDir } from "../db.js";
import { makeId } from "../utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

const ALLOWED = ["image/png", "image/jpeg", "image/webp"];

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".png";
    cb(null, `${makeId("img")}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Tipe file harus PNG/JPG/WEBP"));
  },
});

router.post("/", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || "Upload gagal" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "File gambar wajib diunggah" });
    }

    const url = `/uploads/${req.file.filename}`;
    res.status(201).json({ image: url, fileName: req.file.filename });
  });
});

export default router;
