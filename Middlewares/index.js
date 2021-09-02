/** @format */

const validarCampos = require("../Middlewares/validator-campos");
const validarJWT = require("../Middlewares/validar-jwt");
const rolesPermisos = require("../Middlewares/validar-roles");

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...rolesPermisos,
};
