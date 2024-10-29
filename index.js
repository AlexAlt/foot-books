import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import connectDB from './config/dbConn.js';
import { verifyJWT } from './middleware/verifyJWT.js';
import cookieParser from 'cookie-parser';
import rootRoutes from './routes/root.js';
import loginRoutes from './routes/login.js'
import authRoutes from './routes/api/auth.js'
import booksRoutes from './routes/api/books.js';
import booksHTMLRoutes from './routes/books.js';

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'pug');

app.use('/', rootRoutes);
app.use('/login', loginRoutes)
app.use('/api/auth', authRoutes)

app.use(verifyJWT)
// everything besides the root route should require auth
app.use('/books', booksHTMLRoutes);
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
