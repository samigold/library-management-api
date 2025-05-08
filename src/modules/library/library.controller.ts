import {Request, Response} from 'express';
import { LibraryService } from './library.service';
import { BookStatus as BOOK_STATUS } from '../../shared/constants/book-status.enum';

export const LibraryController = {
    addBook: async (req: Request, res: Response): Promise<void> => {
        const { title, author, isbn, status, quantity } = req.body;

        if (!title || !author || !isbn || !status || !quantity) {
            throw new Error('Missing required fields');
        }

        const existingBook =  await LibraryService.fetchByIsbn(isbn)
      

        if (existingBook) {
            res.status(400).json({ message: 'Book already exists' });
            return;
        }

        const createdBookEntity = await LibraryService.create({
            title,
            author,
            isbn,
            status: BOOK_STATUS.AVAILABLE,
            quantity
        }).catch((error) => {
            console.error("There was an error creating book", error);
            throw new Error(error);
        });

        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: createdBookEntity
        })

    },
    deleteBook: async (req: Request, res: Response): Promise<void> => {
        const { isbn } = req.params;

        if (!isbn) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        const deletedBookEntity = await LibraryService.delete(isbn).catch((error) => {
            console.error("There was an error deleting book", error);
            throw new Error(error);
        });

        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: deletedBookEntity
        })
    }
}