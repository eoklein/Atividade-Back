// Importa o framework Express para criar o servidor
import express from "express";

// Importa o roteador de usuários a partir do arquivo especificado
import roteadorUsers from "./rotas/rotas-usuarios.js";

// Cria uma instância da aplicação Express
const app = express();

// Middleware que permite a aplicação entender requisições com corpo JSON
app.use(express.json());

// Usa o roteador de usuários para qualquer rota que comece com /usuarios
app.use('/usuarios', roteadorUsers);

// Inicia o servidor na porta 3000
app.listen(3000, ()=>{
  console.log("O servidor está rodando na porta 3000 🚀");
});
