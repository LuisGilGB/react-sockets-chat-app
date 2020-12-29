class Socket {
  constructor(io, props = {}) {
    this.io = io;

    this.addSocketEvents();
  }

  addSocketEvents() {
    this.io.on("connection", (socket) => {
      console.log("Socket client connected.");

      socket.emit("connection-message", {
        msg: "Welcome to server!",
        date: new Date(),
      });

      socket.on("disconnect", () => {
        console.log("Socket client disconnected");
      });
    });
  }
}

module.exports = Socket;
