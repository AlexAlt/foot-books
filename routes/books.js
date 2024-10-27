import express from 'express';
import path from 'path';
import { getBooksPageData } from '../controllers/booksController.js';
const router = express.Router();

router.get("/", getBooksPageData);
router.get("/add", function(req, res) {
  res.render('add-book');
})

export default router;
