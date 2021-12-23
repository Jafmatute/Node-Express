/** @format */

const { NOTIMP } = require("dns");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const subirArchivo = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    //Validar archivos
    const nombreSplit = archivo.name.split(".");
    const extension = nombreSplit[nombreSplit.length - 1];

    //Validar Extension
    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extensión ${extension} no es permitida, ${extensionesValidas}`
      );
    }

    const nombreTemp = uuidv4() + "." + extension;

    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(nombreTemp);
    });
  });
};

module.exports = {
  subirArchivo,
};
