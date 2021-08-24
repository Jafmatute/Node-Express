/** @format */

require("dotenv").config();

//Clase server Express
const Server = require("./models/server");

//Intancia del server
const server = new Server();

//Lanzar evento listen
server.listen();
