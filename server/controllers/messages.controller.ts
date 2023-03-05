import { prisma } from '../lib';

export const messagesController = new class {
  async getAllMessages(_, res) {
    const messages = await prisma.message.findMany();
    res.status(200).send({ messages });
  }
}
