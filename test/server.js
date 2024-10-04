const http = require("node:http");

const server = http.createServer((req, res) => {
  const start = new Date();

  try {
    if (req.url === "/error") throw new Error("Whoops!");

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World!\n");
  } finally {
    console.log(
      `req: ${req.method} ${req.url} ${res.statusCode} ${new Date() - start}ms`
    );
  }
});

server.listen(3000, () => console.log(`Server listening on port 3000`));
