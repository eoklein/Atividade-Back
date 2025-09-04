import express from "express";
import autenticar from "./auth.js";

const app = express();
app.use(autenticar);



const usuarios = [
  { id: 1, nome: "Gabriel" },
  { id: 2, nome: "Maria" },
];


app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});


app.get("/", (req, res) => {
  res.json({ ok: true, mensagem: "API online" });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

app.listen(3000);