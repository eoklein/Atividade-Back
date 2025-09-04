// Banco de dados em memória
let usuarios = []          // Armazena todos os usuários
let ultimoId = 0           // Controla o último ID usado

// ------------------------
// LISTAR TODOS OS USUÁRIOS
// ------------------------
function listarTodosUsuarios(req, res) {
    // Retorna a lista completa de usuários com status 200 (OK)
    res.status(200).json(usuarios);
}

// ------------------------
// CRIAR NOVO USUÁRIO
// ------------------------
function criarUsuario(req, res) {
    const { nome, email, idade } = req.body;

    // Verifica se nome e email foram enviados
    if (!nome || !email) {
        return res.status(400).json({ mensagem: "Nome e email são obrigatórios" });
    }

    // Cria novo usuário com ID autoincrementado
    const novoUsuario = {
        nome: nome,
        email: email,
        idade: idade,
        id: ultimoId + 1,
    };

    usuarios.push(novoUsuario); // Adiciona o novo usuário ao array
    ultimoId += 1;              // Atualiza o último ID usado

    // Retorna apenas o ID do novo usuário criado
    res.status(201).json(novoUsuario.id);
}

// ------------------------
// DELETAR USUÁRIO POR ID
// ------------------------
function deletarUsuario(req, res) {
    const id = req.params.id;
    const idNumerico = parseInt(id);

    // Verifica se o ID é um número válido
    if (isNaN(idNumerico)) {
        return res.status(400).json({ mensagem: "ID inválido, precisa ser um numero" });
    }

    // Procura a posição do usuário com o ID informado
    let posicao_do_usuario = usuarios.findIndex(
        (usuario) => usuario.id === idNumerico
    );

    // Se não encontrar, retorna erro 404
    if (posicao_do_usuario === -1) {
        return res.status(404).json({ mensagem: "Usuario nao encontrado" });
    }

    // Remove o usuário da lista
    usuarios.splice(posicao_do_usuario, 1);

    // Resposta com status 204 (sem conteúdo)
    res.status(204).send();
}

// ------------------------
// ATUALIZAR USUÁRIO POR ID
// ------------------------
function atualizarUsuario(req, res) {
    const id = parseInt(req.params.id);

    // Valida se o ID é um número
    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "ID inválido, precisa ser um numero" });
    }

    // Busca o usuário correspondente
    const usuario = usuarios.find((usuario) => usuario.id === id);

    // Se não encontrar, retorna erro 404
    if (!usuario) {
        return res.status(404).json({ mensagem: "Usuario nao encontrado" });
    }

    const { nome, email } = req.body;

    // Verifica se pelo menos um campo foi enviado
    if (!nome && !email) {
        return res.status(400).json({ mensagem: "manda pelo menos um dos dados" });
    }

    // Debug no console
    console.log(`antes de atualizar ${usuario}`);

    // Atualiza o email, se fornecido
    if (email) {
        // Verifica se o email já está em uso por outro usuário
        let email_existe = usuarios.findIndex((usuario) => usuario.email === email);

        // Evita conflito de e-mail
        if (email_existe !== -1) {
            return res.status(409).json({ mensagem: "Email ja cadastrado" });
        }

        usuario.email = email;
        console.log(`depois de atualizar EMAIL ${usuario}`);
    }

    // Atualiza o nome, se fornecido
    if (nome) {
        usuario.nome = nome;
        console.log(`depois de atualizar NOME ${usuario}`);
    }

    // Retorna o usuário atualizado
    res.status(200).json(usuario);
}

// ------------------------
// LISTAR USUÁRIO POR ID
// ------------------------
function listarUsuarioId(req, res) {
    // Busca e retorna o usuário com o ID informado
    return res.status(200).json(usuarios.find((usuario) => usuario.id === parseInt(req.params.id)));
}

// Exporta todas as funções para uso em rotas ou outros arquivos
export {listarTodosUsuarios, criarUsuario, deletarUsuario, atualizarUsuario, listarUsuarioId};
