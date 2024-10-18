import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  currentlyReading: { type: Boolean, default: false },
  readOn: Date,
  meta: {
    imageUrl: String,
  }
});

export const sortBooks = (books) => {
  const sortedBooks = {
    read: [],
    currentlyReading: null,
    toBeRead: []
  };

  books.forEach(book => {
    if (book.currentlyReading) {
      sortedBooks.currentlyReading = book;
    } else if (book.readOn) {
      sortedBooks.read.push(book);
    } else {
      sortedBooks.toBeRead.push(book);
    }
  });
  return sortedBooks;
}

const Book = mongoose.model('Book', bookSchema);
export default Book;
