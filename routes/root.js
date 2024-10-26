import express from 'express';
const router = express.Router();
import Book from '../model/Book.js'

/* GET landing page. */
router.get("/", async (req, res) => {
  try {
    const currentlyReading = await Book.find({ currentlyReading: true }).exec();
    res.render('landing-page', { currentlyReading: currentlyReading[0] });
  } catch (err) {
    // to do: make this render just the message
    res.status(500).json({ 'message': err.message });
  }
});

export default router;
