/** @format */

const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models/");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token)
    return res.status(401).json({ msg: "No hay token en la petición" });

  try {
    //payload
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //Obtener usuario
    const usuario = await Usuario.findById(uid);

    // Verificar usuario
    if (!usuario)
      return res.status(401).json({ msg: "Usuario no existe en el sistema" });

    //verificar si el usuario esta activo
    if (!usuario.estado)
      return res
        .status(401)
        .json({ msg: "Usuario no tiene permisos / contacté al administrador" });

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "token no válido." });
  }
};

module.exports = {
  validarJWT,
};
