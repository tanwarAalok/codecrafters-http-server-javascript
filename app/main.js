const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const parseRequest = (requestData) => {
    const request = requestData.toString().split("\r\n");

    const [method, path, protocol] = request[0].split(" ");

    const headers = {};
    request.slice(1).forEach((header) => {
        const [key, value] = header.split(' ');
        if (key && value) {
            headers[key] = value;
        }
    })

    return {method, path, protocol, headers}
}

const OK_RESPONSE = "HTTP/1.1 200 OK\r\n\r\n";
const ERROR_RESPONSE = "HTTP/1.1 404 Not found\r\n\r\n";

const server = net.createServer((socket) => {

  socket.on("data", (data) => {
      const request = parseRequest(data);
      const { method, path, protocol, headers } = request;

      if (path === "/") {
          socket.write(OK_RESPONSE)
      }
      else if (path.startsWith('/echo')) {
          const randomString = path.substring(6);
          socket.write(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${randomString.length}\r\n\r\n${randomString}`)
      }
      else if (path.startsWith('/user-agent')) {
          const agent = request.headers["User-Agent:"];
          socket.write(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${agent.length}\r\n\r\n${agent}`)
      }
      else socket.write(ERROR_RESPONSE)

      socket.end();
  });
});

server.listen(4221, "localhost");
