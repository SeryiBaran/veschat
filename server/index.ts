import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { prisma } from './lib';

async function main() {
  dotenv.config();

  const port = process.env.PORT || 3000;

  const app = express();
  const httpServer = createServer(app);

  app.use(cors());

  app.get('/messages', async (req, res) => {
    const messages = await prisma.message.findMany();
    res.status(200).send({ messages });
  });

  const io = new Server(httpServer, {
    cors: { origin: /localhost:*/, methods: ['GET', 'POST'] },
  });

  io.on('connection', async socket => {
    socket.on('create chat message', async msg => {
      const newMessage = await prisma.message.create({
        data: { content: msg },
      });
      io.emit('new chat message', newMessage);
    });
  });

  httpServer.listen(port, () => {
    console.log(`Chat socket.io running at http://localhost:${port}/socket.io`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
