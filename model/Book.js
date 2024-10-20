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

export const toBeRead = async () => {
  return await Book.find({ readOn: { $exists: false }, currentlyReading: false }).exec();
}

export const sortBooks = async() => {
  return {
    currentlyReading: await Book.findOne({ currentlyReading: true }).exec(),
    read: await Book.find({ readOn: { $exists: true }, currentlyReading: false }).exec(),
    toBeRead: await toBeRead(),
  };
}

const Book = mongoose.model('Book', bookSchema);
export default Book;
