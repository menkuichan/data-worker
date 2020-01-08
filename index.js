const http = require('http');
require('dotenv').config();

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(process.env.APP_PORT, () => {
  console.log(`Server running at port: ${process.env.APP_PORT}`);
});
