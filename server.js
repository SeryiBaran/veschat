import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { fileURLToPath, URL } from 'node:url';
import { existsSync } from 'node:fs';

const port = process.env.PORT || 3000;
const clientDir = fileURLToPath(new URL('./dist', import.meta.url));

if (!existsSync(clientDir)) {
  throw new Error('./dist dirrectory not found! Build the project!');
  process.exit(1);
}

const app = express();
app.use(express.static(clientDir));

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: /localhost:*/, methods: ['GET', 'POST'] },
});

app.get('/', (_, res) => {
  res.sendFile(clientDir + '/index.html');
});

io.on('connection', socket => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    console.log(msg);
  });
});

httpServer.listen(port, () => {
  console.log(`Chat running at http://localhost:${port}`);
});
