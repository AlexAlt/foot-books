import express from 'express';
import { 
  handleNewBook, 
  handleGetBooks, 
  getCurrentlyReading, 
  getSortedBooks,
 } from '../../controllers/booksController.js';
const router = express.Router();

router.post('/', handleNewBook);
router.get('/', handleGetBooks);
router.get('/sorted-books', getSortedBooks);
router.get('/currently-reading', getCurrentlyReading);

export default router;
