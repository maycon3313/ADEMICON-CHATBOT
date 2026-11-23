import { Router } from "express";
import { saveLead } from "../services/leadService.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const phone = String(req.body.phone || "").trim();
    const interest = String(req.body.interest || "").trim();

    if (name.length < 2 || phone.length < 8 || !interest) {
      return res.status(400).json({ error: "Informe nome, telefone e interesse." });
    }

    const lead = await saveLead({ name, phone, interest, createdAt: new Date().toISOString() });
    res.status(201).json({ message: "Cadastro recebido com sucesso.", lead });
  } catch (error) {
    next(error);
  }
});

export default router;
