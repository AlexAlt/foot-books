require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT;

connectDB();

app.use(express.json());

app.use(express.static(__dirname + '/public'));
app.use('/', require('./routes/root'));
app.use('/books', require('./routes/api/books'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});

mongoose.connection.once('open', () => { 
  console.log('connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
