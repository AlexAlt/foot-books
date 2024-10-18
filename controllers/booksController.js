import Book, { sortBooks } from '../model/Book.js';

export const handleNewBook = async (req, res) => {
  // TODO add meta data fields
  const { title, author, readOn } = req.body;
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
      'readOn': readOn
    });
    res.status(201).json({ 'message': `New book ${title} added!` });
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
};

export const handleGetBooks = async (req, res) => {
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
