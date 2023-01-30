import { createServer } from 'http';
import { Server } from 'socket.io';

import * as dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3000;

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: { origin: /localhost:*/, methods: ['GET', 'POST'] },
});

io.on('connection', socket => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    console.log(msg);
  });
});

httpServer.listen(port, () => {
  console.log(`Chat socket.io running at http://localhost:${port}/socket.io`);
});
