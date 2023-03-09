import { AppDataSource, messagesRepository } from '../lib';
import { Message } from '../entities';

export const messagesApi = {
  async getAll() {
    console.log(await messagesRepository.find())
    return messagesRepository.find();
  },
  async create(content) {
    const message = new Message();
    message.content = content;
    await messagesRepository.save(message);
    return message;
  },
};
