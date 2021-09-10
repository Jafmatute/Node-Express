/** @format */

const { Categoria } = require("../models/");

const obtenerCategorias = async (req, res) => {
  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .skip(Number(desde))
      .limit(Number(limit))
      .populate("usuario", "nombre"),
  ]);

  res.status(200).json({
    total,
    categorias,
  });
};

const obtenerCategoria = async (req, res) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  if (!categoria.estado) {
    return res
      .status(401)
      .json({ msg: `La categoría no se encuentra disponible` });
  }

  res.status(200).json(categoria);
};

const crearCategoria = async (req, res) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB)
    return res
      .status(400)
      .json({ msg: `La categoria: ${nombre} ya existe en el sistema` });

  //Generar la información a guardar

  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  //Guardar DB
  await categoria.save();

  res.status(201).json(categoria);
};

//actualizarCategoria
const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.status(200).json(categoria);
};

//borrarCategoria -estado:false
const borrarCategoria = async (req, res) => {
  const { id } = req.params;
  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.status(200).json(categoria);
};

module.exports = {
  actualizarCategoria,
  borrarCategoria,
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
};
