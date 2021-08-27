/** @format */

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../Middlewares/validator-campos");
const {
  isRolValidate,
  verifyEmail,
  verifyUsuario,
} = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

// check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener más de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El e-mail no es válido.").isEmail(),
    check("correo").custom(verifyEmail),
    check("rol").custom(isRolValidate),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(verifyUsuario),
    check("rol").custom(isRolValidate),
    validarCampos,
  ],
  usuariosPut
);

router.patch("/", usuariosPatch);

router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(verifyUsuario),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
