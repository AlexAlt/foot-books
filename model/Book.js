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


bookSchema.methods.updateMultipleFields = function(compactedParams = {}) {
  return Object.entries(compactedParams).forEach(param => {
    this[`${param[0]}`] = param[1]
  });
}

export const toBeRead = async () => {
  return await Book.find({ readOn: { $exists: false }, currentlyReading: false }).exec();
}

export const sortBooks = async() => {
  return {
    currentlyReading: await Book.find({ currentlyReading: true }).exec(),
    read: await Book.find({ readOn: { $exists: true }, currentlyReading: false }).exec(),
    toBeRead: await toBeRead(),
  };
}

const Book = mongoose.model('Book', bookSchema);
export default Book;
