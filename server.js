// server.js
const http = require('http');
const playerData = [
  { id: 1, name: "Virat Kohli", team: "RCB", points: 100 },
  { id: 2, name: "Jasprit Bumrah", team: "MI", points: 90 },
  { id: 3, name: "Sanju Samson", team: "RR", points: 75 },
  { id: 4, name: "Ravindra Jadeja", team: "CSK", points: 80 },
  { id: 5, name: "Andre Russell", team: "KKR", points: 70 },
];

const server = http.createServer((req, res) => {
  if (req.url === '/api/players' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify(playerData));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
