
const books = require('./bookModel');

exports.getBooks = (req, res) => {
    res.json(books.getAllBooks());
};

exports.getBookById = (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.getBookById(bookId);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
};

exports.createBook = (req, res) => {
    const newBook = req.body;
    const createdBook = books.createBook(newBook);
    res.status(201).json(createdBook);
};

exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, publicationYear } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, publicationYear }, { new: true });
        
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(updatedBook);
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(204).end();
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.filterBooks = async (req, res) => {
    const { author, year } = req.query;
    const filter = {};

    if (author) {
        filter.author = author;
    }

    if (year) {
        filter.publicationYear = year;
    }

    try {
        const books = await Book.find(filter);
        res.json(books);
    } catch (error) {
        console.error('Error filtering books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};