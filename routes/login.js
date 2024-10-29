import express from 'express';
const router = express.Router();

/* GET landing page. */
router.get("/", async (req, res) => {
  res.render('login');
});

export default router;
