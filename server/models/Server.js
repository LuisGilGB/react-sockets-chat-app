const path = require("path");
const http = require("http");
const chalk = require("chalk");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const { connectDB } = require("../database/config");

const Socket = require("./Socket");

const PUBLIC_DIR = path.resolve(__dirname, "../public");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    connectDB();

    this.server = http.createServer(this.app);

    this.io = socketio(this.server, {});

    this.socket = new Socket(this.io);
  }

  initMiddlewares() {
    this.app.use(express.static(PUBLIC_DIR));
    this.app.use(cors());
  }

  run() {
    this.initMiddlewares();

    this.server.listen(this.port, () => {
      console.log(`Server running on port ${chalk.cyan(this.port)}`);
    });
  }
}

module.exports = Server;
