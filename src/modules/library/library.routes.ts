import express from 'express';
import { LibraryController } from './library.controller';

const LibraryRoutes = express.Router();

LibraryRoutes.post('/add', LibraryController.addBook);
//LibraryRoutes.get('/fetch/:id', LibraryController.fetchById);

export default LibraryRoutes;