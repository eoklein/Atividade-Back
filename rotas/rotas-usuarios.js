import { Router } from "express";

const rotas = Router();

app.post("/usuarios", autenticar, (req, res) => {
  return res.status(201).json({ mensagem: "Rota permitida" });
});