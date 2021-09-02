/** @format */

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../Middlewares/validator-campos");

//Controllers
const { login } = require("../controllers/auth");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El e-mail es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
