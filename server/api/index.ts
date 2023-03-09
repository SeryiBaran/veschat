import { AppDataSource } from '../lib';
import { Message } from '../entities';

export const messagesApi = {
  async getAll() {
    return Message.find();
  },
  async create(content) {
    const message = new Message();
    message.content = content;
    await message.save();
    return message;
  },
};
