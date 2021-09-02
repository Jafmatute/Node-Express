/** @format */

const adminRol = (req, res, next) => {
  if (!req.usuario)
    return res
      .status(500)
      .json({ msg: "Se está queriendo verificar rol sin estár autenticado" });

  const { rol, nombre } = req.usuario;
  if (rol !== "ADMIN_ROLE")
    return res.status(401).json({
      msg: `el usuario: ${nombre} no tiene los permisos necesarios para realizar la acción`,
    });

  next();
};

const rolesPermisos = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario)
      return res
        .status(500)
        .json({ msg: "Se está queriendo verificar rol sin estár autenticado" });

    if (!roles.includes(req.usuario.rol))
      return res
        .status(401)
        .json({ msg: `Debe tener al menos un rol: ${roles}` });

    next();
  };
};

module.exports = {
  adminRol,
  rolesPermisos,
};
