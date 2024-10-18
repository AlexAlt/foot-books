import express from 'express';
import path from 'path';
const router = express.Router();

router.get("/", function (req, res) {
  res.sendFile(path.join(process.cwd(), 'views', 'books.html'));
});

export default router;
