import express from 'express';
import { handleNewBook, handleGetBooks, getCurrentlyReading } from '../../controllers/booksController.js';
const router = express.Router();

router.post('/', handleNewBook);
router.get('/', handleGetBooks)
router.get('/currently-reading', getCurrentlyReading);

export default router;
