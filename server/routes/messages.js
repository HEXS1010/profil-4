import { Router } from "express";
import { db } from "../db.js";
import { makeId } from "../utils.js";

const router = Router();

// Daftar nama file avatar yang valid (fisiknya ada di src/assets/img/avatar/).
// Tambahkan nama file baru ke array ini supaya bisa dipilih secara random.
const AVATARS = ["avatar-1.png"];

const insertHistoris = (tipe, judul, detail = null) => {
  db.prepare(
    "INSERT INTO historis (id, tipe, judul, detail, created_at) VALUES (?, ?, ?, ?, datetime('now'))"
  ).run(makeId("his"), tipe, judul, detail);
};

router.get("/", (_req, res) => {
  const messages = db
    .prepare("SELECT * FROM messages ORDER BY created_at DESC, id DESC")
    .all();
  res.json(messages);
});

router.post("/", (req, res) => {
  const { name, email, subject = "", message } = req.body || {};

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Nama, email, dan isi pesan wajib diisi" });
  }

  const avatar = AVATARS[Math.floor(Math.random() * AVATARS.length)] || null;

  db.prepare(
    `INSERT INTO messages (id, name, email, subject, message, avatar, is_read, created_at)
     VALUES (?, ?, ?, ?, ?, ?, 0, datetime('now'))`
  ).run(makeId("msg"), name, email, subject, message, avatar);

  insertHistoris("pesan-masuk", name, subject || "Pesan masuk baru");
  res.status(201).json({ ok: true });
});

// Tandai pesan dibaca. is_read hanya status badge, pesan tetap bisa dibuka kapan saja.
router.patch("/:id/read", (req, res) => {
  const existing = db
    .prepare("SELECT * FROM messages WHERE id = ?")
    .get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Pesan tidak ditemukan" });

  const isRead = req.body?.is_read ? 1 : 0;
  db.prepare("UPDATE messages SET is_read = ? WHERE id = ?").run(
    isRead,
    req.params.id
  );
  res.json({ ok: true, is_read: isRead });
});

// Hapus pesan (pembersihan manual oleh admin).
router.delete("/:id", (req, res) => {
  const existing = db
    .prepare("SELECT * FROM messages WHERE id = ?")
    .get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Pesan tidak ditemukan" });

  db.prepare("DELETE FROM messages WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

export default router;
