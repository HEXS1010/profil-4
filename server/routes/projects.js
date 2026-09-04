import { Router } from "express";
import { db } from "../db.js";
import { makeId, slugify, todayDate } from "../utils.js";

const router = Router();

const insertHistoris = (tipe, judul, detail = null) => {
  db.prepare(
    "INSERT INTO historis (id, tipe, judul, detail, created_at) VALUES (?, ?, ?, ?, datetime('now'))"
  ).run(makeId("his"), tipe, judul, detail);
};

router.get("/", (_req, res) => {
  const projects = db
    .prepare("SELECT * FROM projects ORDER BY created_at DESC, id DESC")
    .all();
  res.json(projects);
});

router.get("/:id", (req, res) => {
  const project = db
    .prepare("SELECT * FROM projects WHERE id = ?")
    .get(req.params.id);
  if (!project) return res.status(404).json({ error: "Projek tidak ditemukan" });
  res.json(project);
});

router.post("/", (req, res) => {
  const { title, category, desc, content = "", demo = "", repo = "", image = "", alt = "" } = req.body || {};

  if (!title || !category || !desc) {
    return res.status(400).json({ error: "Judul, kategori, dan deskripsi wajib diisi" });
  }

  const id = makeId(slugify(title));
  const date = todayDate();
  const altText = alt || `Tangkapan layar ${title}`;

  db.prepare(
    `INSERT INTO projects (id, title, category, desc, image, alt, date, content, demo, repo, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
  ).run(id, title, category, desc, image, altText, date, content, demo, repo);

  insertHistoris("upload", title, "Projek baru ditambahkan");
  res.status(201).json({ id, ...req.body, image, alt: altText, date });
});

router.put("/:id", (req, res) => {
  const existing = db.prepare("SELECT * FROM projects WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Projek tidak ditemukan" });

  const { title, category, desc, content = "", demo = "", repo = "", image = "", alt = "" } = req.body || {};
  if (!title || !category || !desc) {
    return res.status(400).json({ error: "Judul, kategori, dan deskripsi wajib diisi" });
  }

  const altText = alt || `Tangkapan layar ${title}`;

  db.prepare(
    `UPDATE projects SET title = ?, category = ?, desc = ?, content = ?, demo = ?, repo = ?, image = ?, alt = ?
     WHERE id = ?`
  ).run(title, category, desc, content, demo, repo, image, altText, req.params.id);

  res.json({ ...existing, title, category, desc, content, demo, repo, image, alt: altText });
});

router.delete("/:id", (req, res) => {
  const existing = db.prepare("SELECT * FROM projects WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Projek tidak ditemukan" });

  db.prepare("DELETE FROM projects WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

export default router;
