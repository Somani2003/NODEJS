// app.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, CSI! This is my first Node.js app.');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

