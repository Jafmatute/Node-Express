/** @format */

const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");
const { verifyCategoria, verifyProducto } = require("../helpers/db-validators");
const { validarCampos, validarJWT, adminRol } = require("../Middlewares");

const router = Router();

router.get("/", obtenerProductos);

router.get(
  "/:id",
  [
    check("id", "No es un ID válido de Mongo").isMongoId(),
    check("id").custom(verifyProducto),
    validarCampos,
  ],
  obtenerProducto
);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un ID válido de mongo").isMongoId(),
    check("categoria").custom(verifyCategoria),
    validarCampos,
  ],
  crearProducto
);

router.put(
  "/:id",
  [
    validarJWT,
    // check("categoria", "No es un ID de mongo válido").isMongoId(),
    check("id").custom(verifyProducto),
    validarCampos,
  ],
  actualizarProducto
);

router.delete(
  "/:id",
  [
    validarJWT,
    adminRol,
    check("id", "No es un ID válido de mongo").isMongoId(),
    check("id").custom(verifyProducto),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
