import express from 'express';
import { 
  createBook, 
  getBooks, 
  getRandomBook,
  getCurrentlyReading, 
  getSortedBooks,
  updateBook,
 } from '../../controllers/api/booksController.js';
const router = express.Router();

router.post('/', createBook);
router.get('/', getBooks);
router.patch('/:id', updateBook)
router.get('/sorted-books', getSortedBooks);
router.get('/next-read', getRandomBook);
router.get('/currently-reading', getCurrentlyReading);

export default router;
