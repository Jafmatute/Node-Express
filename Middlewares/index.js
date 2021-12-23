/** @format */

const validarCampos = require("../Middlewares/validator-campos");
const validarJWT = require("../Middlewares/validar-jwt");
const rolesPermisos = require("../Middlewares/validar-roles");
const validarArchivo = require("../Middlewares/validar-archivo");
module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...validarArchivo,
  ...rolesPermisos,
};
