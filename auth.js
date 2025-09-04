// auth.js
function autenticar(req, res, next) {
  const { tipoUsuario } = req.body || {};

  if (tipoUsuario === "ADM") {
    return next(); // autorizado, segue para a rota
  }

  return res
    .status(401)
    .json({ mensagem: "Funcao nao permitida para esse usuario" });
};



export {autenticar};