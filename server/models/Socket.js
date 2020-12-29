const {
  setUserOnline,
  setUserOffline,
  getUsers,
} = require("../controllers/sockets");
const { checkJWT } = require("../helpers/jwt");

class Socket {
  constructor(io, props = {}) {
    this.io = io;

    this.addSocketEvents();
  }

  addSocketEvents() {
    this.io.on("connection", async (socket) => {
      const [isValidToken, uid] = checkJWT(socket.handshake.query["x-token"]);

      if (!isValidToken) {
        console.log("Unidentified socket. Disconnecting...");
        return socket.disconnect();
      }
      console.log(`Socket client connected (uid: ${uid})`);

      await setUserOnline(uid);

      socket.emit("connection-message", {
        msg: "Welcome to server!",
        date: new Date(),
      });

      this.io.emit("users-update", {
        payload: {
          users: await getUsers(),
        },
      });

      socket.on("disconnect", async () => {
        await setUserOffline(uid);
        console.log(`Socket client disconnected (uid: ${uid})`);
        this.io.emit("users-update", {
          payload: {
            users: await getUsers(),
          },
        });
      });
    });
  }
}

module.exports = Socket;
