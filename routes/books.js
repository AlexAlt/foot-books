import express from 'express';
import path from 'path';
const router = express.Router();

router.get("/", function (req, res) {
  res.sendFile(path.join(process.cwd(), 'views', 'books.html'));
});
router.get("/add", function(req, res) {
  res.sendFile(path.join(process.cwd(), 'views', 'add-a-book.html'));
})

export default router;
