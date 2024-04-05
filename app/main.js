const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const OK_RESPONSE = "HTTP/1.1 200 OK\r\n\r\n";
const ERROR_RESPONSE = "HTTP/1.1 404 Not found\r\n\r\n";

const server = net.createServer((socket) => {
  socket.on("close", () => {
    socket.end();
    server.close();
  });

  socket.on("data", (data) => {
      const sections = data.toString().split("\r\n");
      const path = sections[0].split(" ")[1];

      if (path === "/") {
          socket.write(OK_RESPONSE)
      }
      else socket.write(ERROR_RESPONSE)

      socket.end();
  });
});

server.listen(4221, "localhost");
