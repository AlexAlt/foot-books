const express = require("express");
const router = express.Router();
const path = require('path')

/* GET landing page. */
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'views', 'landing-page.html'));
});

module.exports = router;
