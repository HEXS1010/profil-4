import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { uploadsDir } from "./db.js";
import projectsRouter from "./routes/projects.js";
import historisRouter from "./routes/historis.js";
import uploadRouter from "./routes/upload.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.use("/uploads", express.static(uploadsDir));

app.use("/api/projects", projectsRouter);
app.use("/api/historis", historisRouter);
app.use("/api/upload", uploadRouter);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Backend jalan di http://localhost:${PORT}`);
});
