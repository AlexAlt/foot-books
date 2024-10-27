import express from 'express';

import { renderBooks, renderRandomBook } from '../controllers/booksController.js';
const router = express.Router();

router.get("/", renderBooks);
router.get("/add", function(req, res) {
  res.render('add-book');
})
router.get("/rand", renderRandomBook)
export default router;
