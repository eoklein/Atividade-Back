// Importações necessárias
import { Router } from "express";
import { imprimir, verificarAdm } from "../middlewares/auth.js";
import {atualizarUsuario, criarUsuario, deletarUsuario, listarTodosUsuarios, listarUsuarioId} from "../controller/usuarios-controller.js";

// Criação do roteador
const rotas = Router();

// Rota para criar usuário (somente ADM)
rotas.post("/", [imprimir, verificarAdm], criarUsuario);

// Rota para listar todos os usuários
rotas.get("/", [imprimir], listarTodosUsuarios);

// Rota para deletar usuário por ID
rotas.delete("/:id", [imprimir], deletarUsuario);

// Rota para atualizar usuário por ID
rotas.patch("/:id", [imprimir], atualizarUsuario);

// Rota para buscar um usuário por ID
rotas.get("/:id", [imprimir], listarUsuarioId);

// Exporta as rotas
export default rotas;