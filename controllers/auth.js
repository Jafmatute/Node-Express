/** @format */

const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el e-mail existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos " });
    }
    // Verificar usuario activo
    if (!usuario.estado) {
      return res
        .status(400)
        .json({ msg: "Usuario sin permisos, contacté con el administrador " });
    }

    // Verificar la contraseña
    const verifyPass = bcryptjs.compareSync(password, usuario.password);
    if (!verifyPass) {
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos " });
    }

    //gener el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Hubo un error inesperado intente nuevamante" });
  }
};

module.exports = {
  login,
};
