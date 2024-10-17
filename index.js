import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import connectDB from './config/dbConn.js';
import rootRoutes from './routes/root.js';
import booksRoutes from './routes/api/books.js';
import bookHTMLRoutes from './routes/books.js';

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());

app.use(express.static(path.resolve(process.cwd(), 'public')));
app.use('/', rootRoutes);
app.use('/books', bookHTMLRoutes);
app.use('/api/books', booksRoutes);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(path.resolve(process.cwd(), 'views', '404.html')));
  } else if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});

mongoose.connection.once('open', () => { 
  console.log('connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
