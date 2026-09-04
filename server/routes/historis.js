import { Router } from "express";
import { db } from "../db.js";

const router = Router();

router.get("/", (_req, res) => {
  const historis = db
    .prepare("SELECT * FROM historis ORDER BY created_at DESC, id DESC")
    .all();
  res.json(historis);
});

export default router;
