import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { AppDataSource } from './lib';
import { messagesApi } from './api';
import { messagesRouter } from './routes/messages.router';

dotenv.config();

async function main() {
  const port = process.env.PORT || 3000;

  const app = express();
  const httpServer = createServer(app);

  app.use(cors());

  app.use('/messages', messagesRouter);

  const io = new Server(httpServer, {
    cors: {
      origin: new RegExp(process.env.CORS_REGEX),
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', async socket => {
    socket.on('create chat message', async content => {
      const newMessage = await messagesApi.create(content);
      io.emit('new chat message', newMessage);
    });
  });

  httpServer.listen(port, () => {
    console.log(`Chat socket.io running at http://localhost:${port}/socket.io`);
  });
}

AppDataSource.initialize()
  .then(main)
  .catch(async e => {
    console.error(e);
    process.exit(1);
  });
