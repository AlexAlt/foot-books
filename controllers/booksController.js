import Book from '../model/Book.js';

export const handleNewBook = async (req, res) => {
  const { title, author, readOn } = req.body;
  if (!title) {
    return res.status(400).json({ 'message': 'Title is required' });
  }

  const duplicate = await Book.findOne({ title: title }).exec();

  if (duplicate) {
    return res.sendStatus(409);
  }

  try {
    const result = await Book.create({
      'title': title,
      'author': author,
      'readOn': readOn
    });
    res.status(201).json({ 'success': `New book ${title} added!` });
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

export const getCurrentlyReading = async (req, res) => {
  try {
    const books = await Book.find({ currentlyReading: true }).exec();
    res.status(200).json(books[0]);
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
}
