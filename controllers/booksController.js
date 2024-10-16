const Book = require('../model/Book');

const handleNewBook = async(req, res) => {
  console.log(req.body)
  const { title, author } = req.body;
  if (!title) {
    return res.status(400).json({ 'message': 'Title is required' })
  }

  const duplicate = await Book.findOne({title: title}).exec();
  
  if (duplicate) {
    return res.sendStatus(409);
  }

  try {
    const result = await Book.create(
      {
        'title': title,
        'author': author,
      }
    );
    console.log(result)
    res.status(201).json({'success': `New book ${title} added!`})
  } catch(err) {
    res.status(500).json({'message': err.message})
  }
}

module.exports = {
  handleNewBook
}
