import express from 'express';
import { handleNewBook } from '../../controllers/booksController.js';
const router = express.Router();

router.post('/', handleNewBook);

export default router;
