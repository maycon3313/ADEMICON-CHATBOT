import { Router } from "express";
import { getBotReply } from "../services/chatbotService.js";

const router = Router();

router.post("/", (req, res) => {
  const message = String(req.body.message || "").trim();
  if (!message) return res.status(400).json({ error: "Digite uma mensagem." });

  res.json({ reply: getBotReply(message) });
});

export default router;
