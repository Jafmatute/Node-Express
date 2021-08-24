/** @format */

const express = require("express");
const cors = require("cors");

class Server {
  //Inicialización
  constructor() {
    //Express
    this.app = express();
    this.port = process.env.PORT;

    //Rutas Middleware
    this.usuariosPath = "/api/usuarios";

    //Middlewares
    this.middlewares();

    //Llamar rutas app
    this.routes();
  }

  //Middlewares
  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y Parseo del body
    this.app.use(express.json());

    //Directorio Público
    this.app.use(express.static("public"));
  }

  //Rutas
  routes() {
    //requerir mis rutas
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  //Correr app
  listen() {
    this.app.listen(this.port, () => {
      console.log(`URL::: http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
