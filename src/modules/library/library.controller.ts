import {Request, Response} from 'express';
import { LibraryService } from './library.service';
import { BookStatus as BOOK_STATUS } from '../../shared/constants/book-status.enum';
import { BadRequestError, NotFoundError } from '../../shared/errors';

export const LibraryController = {
    getBook: async (req: Request, res: Response): Promise<void> => {
        const { isbn } = req.params;
            
            if (!isbn) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }
    
            const book = await LibraryService.fetchById(isbn)
    
            if (!book) {
                res.status(404).json({ message: 'Book not found' });
                return;
            }
    
            res.status(200).json({
                success: true,
                message: 'Book fetched successfully',
                data: book
            })

    },
    getAllBooks: async (req: Request, res: Response): Promise<void> => {
        const books = await LibraryService.fetchAll()

        if (!books) {
            res.status(404).json({ message: 'Books not found' });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Books fetched successfully',
            data: books
        })

    },
    addBook: async (req: Request, res: Response): Promise<void> => {
        const { title, author, isbn, status, quantity } = req.body;

        if (!title || !author || !isbn || !status || !quantity) {
            throw new BadRequestError('Missing required fields');
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
            totalQuantity: quantity,
            availableQuantity: quantity
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
        try{
        const { isbn } = req.body;

        if (!isbn) {
            throw new BadRequestError('Missing required fields');
        }

        const deletedBookEntity = await LibraryService.delete(isbn)

        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: deletedBookEntity
        })
    } catch (error) {
        throw error;
    }
    },
    updateBook: async (req: Request, res: Response): Promise<void> => {
        try{
        const { isbn, title, author, status, quantity } = req.body;
        const existingBook = await LibraryService.fetchByIsbn(isbn)
        if (!existingBook) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        const updatedBookEntity = await LibraryService.update(isbn, {
            title,
            author,
            status,
            totalQuantity: quantity
        })
        } catch (error) {
            console.error("There was an error updating book", error);
            throw error;
        }
    },
    borrowBook: async (req: Request, res: Response) : Promise<void> => {
        const { isbn } = req.body;

        if (!isbn) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        const bookEntity = await LibraryService.borrow(isbn)

        if (!bookEntity) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }



        res.status(200).json({
            success: true,
            message: 'Book borrowed successfully',
            data: bookEntity
        })

    },

    returnBook: async (req: Request, res: Response) : Promise<void> => {
        const { isbn } = req.body;

        if (!isbn) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        const bookEntity = await LibraryService.return(isbn)

        if (!bookEntity) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Book returned successfully',
            data: bookEntity
        })
    }
}