const http = require('http');
const url = require('url');

const clients = new Set();
const server = http.createServer((req, res) => {
  if (req.url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    clients.add(res);

    const t = setInterval(() => {
      res.write('data: PING\n\n');
    }, 5000);

    res.socket.on('close', () => {
      clients.delete(res);
    });
  } else if (req.url.startsWith('/fire')) {
    const query = url.parse(req.url, true).query;
    for (const c of clients) {
      c.write(`data: ${query.id}\n\n`);
    }
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*'
    });
    res.end();
  } else {
    res.writeHead(404);
    res.end();
  }
});
server.listen(process.env.PORT || 3001);
