import { messagesApi } from '../api';

export const messagesController = new (class {
  async getAllMessages(_, res) {
    const messages = await messagesApi.getAll();
    res.status(200).json({ messages });
  }
})();
