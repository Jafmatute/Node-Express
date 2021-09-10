/** @format */

const { Role, Usuario, Categoria, Producto } = require("../models/");

//Usuarios
const isRolValidate = async (rol = "") => {
  const existRol = await Role.findOne({ rol });
  if (!existRol) throw new Error(`El rol: ${rol} no está registrado.`);
};

const verifyEmail = async (correo = "") => {
  const email = await Usuario.findOne({ correo });
  if (email) {
    throw new Error(`El e-mail ${correo} ya se encuentrá registrado..`);
  }
};

const verifyUsuario = async (id) => {
  const usuario = await Usuario.findById(id);
  if (!usuario) {
    throw new Error(`El ID: ${id} no existe en la base de datos`);
  }
};

//Categorias
const verifyCategoria = async (id) => {
  const categoriaId = await Categoria.findById(id);

  if (!categoriaId) {
    throw new Error(`El ID: ${id} no existe`);
  }
};

const verifyProducto = async (id) => {
  const productoId = await Producto.findById(id);

  if (!productoId) {
    throw new Error(`El ID: ${id} no existe`);
  }
};

module.exports = {
  isRolValidate,
  verifyEmail,
  verifyUsuario,
  verifyCategoria,
  verifyProducto,
};
