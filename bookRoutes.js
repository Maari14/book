
const express = require('express');
const router = express.Router();
const bookController = require('./bookController');
const authenticateUser = require('./authenticateUser');

router.get('/', authenticateUser, bookController.getBooks);
router.get('/filter', authenticateUser, bookController.filterBooks);
router.get('/:id', authenticateUser, bookController.getBookById);
router.post('/', authenticateUser, bookController.createBook);
router.put('/:id', authenticateUser, bookController.updateBook);
router.delete('/:id', authenticateUser, bookController.deleteBook);

module.exports = router;
