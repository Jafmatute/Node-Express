/** @format */

const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");
const { verifyCategoria } = require("../helpers/db-validators");

const { validarJWT, validarCampos, adminRol } = require("../Middlewares/");

const router = Router();

//Obtener todas las categorías
router.get("/", obtenerCategorias);

//Obtener una categoría por ID(Unica)
router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(verifyCategoria),
    validarCampos,
  ],
  obtenerCategoria
);
// Crear categoría privado - cualquier persona con un token válido.
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//Actualizar por id, privado cualquier persona con token válido.
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(verifyCategoria),
    validarCampos,
  ],
  actualizarCategoria
);

//borrar categoría  -- cambiar su estado*
router.delete(
  "/:id",
  [
    validarJWT,
    adminRol,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(verifyCategoria),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
