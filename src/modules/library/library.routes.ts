import express from 'express';
import { LibraryController } from './library.controller';

const LibraryRoutes = express.Router();


LibraryRoutes.get('/', LibraryController.getAllBooks);
LibraryRoutes.post('/add', LibraryController.addBook);
LibraryRoutes.post('/borrow', LibraryController.borrowBook);
LibraryRoutes.put('/return', LibraryController.returnBook);

LibraryRoutes.delete('/delete', LibraryController.deleteBook);
//LibraryRoutes.get('/fetch/:id', LibraryController.fetchById);

export default LibraryRoutes;