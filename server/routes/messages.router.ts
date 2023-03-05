import Router from 'express';
import { messagesController } from '../controllers/messages.controller';

const router = Router();

router.get('/', messagesController.getAllMessages);

export const messagesRouter = router;
