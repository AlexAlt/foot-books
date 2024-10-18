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

export const sortBooks = async() => {
  return {
    read: await Book.findOne({ currentlyReading: true }).exec(),
    currentlyReading: await Book.find({ readOn: {$exists: true }, currentlyReading: false }).exec(),
    toBeRead: await Book.find({ readOn: {$exists: false }, currentlyReading: false }).exec()
  };
}

const Book = mongoose.model('Book', bookSchema);
export default Book;
