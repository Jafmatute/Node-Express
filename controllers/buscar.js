/** @format */
const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto } = require("../models/");

const colecciones = ["categorias", "productos", "usuarios", "roles"];

const buscarUsuarios = async (termino = "", res) => {
  const MongoID = ObjectId.isValid(termino); //true or false

  if (MongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  //count contar las respuestas --> Usuario.count
  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

const buscarCategorias = async (termino = "", res) => {
  const MongoID = ObjectId.isValid(termino); //true or false

  if (MongoID) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  //count contar las respuestas --> Categoria.count
  const categorias = await Categoria.find({ nombre: regex, estado: true });

  res.json({
    results: categorias,
  });
};

const buscarProductos = async (termino = "", res) => {
  const MongoID = ObjectId.isValid(termino); //true or false

  if (MongoID) {
    const producto = await Producto.findById(termino).populate(
      "categoria",
      "nombre"
    );
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  //count contar las respuestas --> Producto.count
  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  }).populate("categoria", "nombre");

  res.json({
    results: productos,
  });
};

const buscar = (req, res) => {
  const { coleccion, termino } = req.params;

  if (!colecciones.includes(coleccion)) {
    res.status(400).json({
      msg: `las colecciones permitidas son: ${colecciones}`,
    });
  }

  switch (coleccion) {
    case "categorias":
      buscarCategorias(termino, res);
      break;

    case "usuarios":
      buscarUsuarios(termino, res);
      break;

    case "productos":
      buscarProductos(termino, res);
      break;
    default:
      res.status(500).json({ msg: "No se programo esa búsqueda" });
      break;
  }
};

module.exports = {
  buscar,
};
