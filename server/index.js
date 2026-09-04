import express from "express";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { uploadsDir } from "./db.js";
import projectsRouter from "./routes/projects.js";
import historisRouter from "./routes/historis.js";
import uploadRouter from "./routes/upload.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "..", "dist");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.use("/uploads", express.static(uploadsDir));

app.use("/api/projects", projectsRouter);
app.use("/api/historis", historisRouter);
app.use("/api/upload", uploadRouter);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  const indexPath = path.join(distDir, "index.html");
  app.get(/^(?!\/(api|uploads)).*/, (_req, res) => {
    res.sendFile(indexPath);
  });
} else {
  console.warn(
    "Folder dist/ belum ada. Jalankan 'npm run build' dulu agar frontend tersaji."
  );
}

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
