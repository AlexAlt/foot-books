import express from 'express';
import path from 'path';
const router = express.Router();

/* GET landing page. */
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'views', 'landing-page.html'));
});

export default router;
