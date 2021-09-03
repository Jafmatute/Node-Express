/** @format */

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../Middlewares/validator-campos");

//Controllers
const { login, googleSignIn } = require("../controllers/auth");

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

router.post(
  "/google",
  [check("id_token", "El token de google es obligatorio"), validarCampos],
  googleSignIn
);

module.exports = router;
