import express from 'express';
import { 
  createBook, 
  getBooks, 
  getRandomBook,
  getCurrentlyReading, 
  getSortedBooks,
 } from '../../controllers/booksController.js';
const router = express.Router();

router.post('/', createBook);
router.get('/', getBooks);
router.get('/sorted-books', getSortedBooks);
router.get('/next-read', getRandomBook);
router.get('/currently-reading', getCurrentlyReading);

export default router;
