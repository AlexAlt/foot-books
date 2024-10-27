import { sortBooks, toBeRead } from '../model/Book.js';

export const renderRandomBook = async (req, res) => {
  let selection;
  try {
    const books = await toBeRead();
    if (books) {
      selection = books[Math.floor(Math.random() * (books.length - 1))]
    }
    res.render('random-book', { book: selection });
  } catch (err) {
    // to do: make this render just the message
    res.status(500).json({ 'message': err.message });
  }
}


export const renderBooks = async (req, res) => {
  try {
    const sortedBooks = await sortBooks();
    res.render('books', { books: sortedBooks });
  } catch (err) {
    // to do: make this render just the message
    res.status(500).json({ 'message': err.message });
  }
}
