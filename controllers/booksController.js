import Book, { sortBooks, toBeRead } from '../model/Book.js';

export const createBook = async (req, res) => {
  // TODO add meta data fields
  const { title, author, readOn, currentlyReading } = req.body;
  if (!title) {
    return res.status(400).json({ 'message': 'Title is required' });
  }

  const match = new RegExp(title, 'i');
  const duplicate = await Book.findOne({ title: { $regex: match }}).exec();

  if (duplicate) {
    return res.status(409).json({'message': 'Title already exists'});
  }

  try {
    const result = await Book.create({
      'title': title,
      'author': author,
      'readOn': readOn,
      'currentlyReading': currentlyReading
    });
    res.status(201).json({ 'message': `New book ${title} added!` });
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
};

export const getRandomBook = async (req, res) => {
  let selection;
  try {
    const books = await toBeRead();
    if (books) {
      selection = books[Math.floor(Math.random() * (books.length - 1))]
    }
    res.status(200).json(selection);
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
}

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().exec();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
}

export const getSortedBooks = async (req, res) => {
  try {
    const sortedBooks = await sortBooks();
    res.status(200).json(sortedBooks);
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
}

export const getCurrentlyReading = async (req, res) => {
  try {
    const books = await Book.find({ currentlyReading: true }).exec();
    res.status(200).json(books[0]);
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
}
