import BookModel from "./model/Book";
import { ICreateBook } from "./library.types";
import { LibraryEntity } from "./library.entity";
import { BookStatus } from "../../shared/constants/book-status.enum";


export const LibraryService = {
    fetchById: async (isbn: string) => {
        const bookRecord = await BookModel.findOne({isbn})
        .catch((error) => {
            console.error("There was an error fetching book by id", error);
            throw new Error(error);
        })

        if (!bookRecord) throw new Error("Book not found");

        return LibraryEntity.fromRecordToEntity(bookRecord);
    },
    fetchByIsbn: async (isbn: string) => {
        try{
        const bookRecord = await BookModel.findOne({isbn})

        if(!bookRecord) return null;
        return LibraryEntity.fromRecordToEntity(bookRecord);
        } catch (error) {
            console.error("There was an error fetching book by id", error);
            throw error;
        }
    },
    create: async (book: ICreateBook) : Promise<LibraryEntity> => {
        const createdBookRecord = await BookModel.create({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            status: book.status,
            quantity: book.quantity
        }).catch((error) => {
            console.error("There was an error creating book", error);
            throw new Error(error);
        })

        return LibraryEntity.fromRecordToEntity(createdBookRecord);
    },
    delete: async (isbn: string) => {
        const deletedBookRecord = await BookModel.findOneAndDelete({isbn})
        .catch((error) => {
            console.error("There was an error deleting book", error);
            throw new Error(error);
        })

        if (!deletedBookRecord) {
            throw new Error('Book not found');
        };

        return LibraryEntity.fromRecordToEntity(deletedBookRecord);
    },
    borrow: async (isbn: string) => {
        const bookRecord = await BookModel.findOne({isbn})
        .catch((error) => {
            console.error("There was an error fetching book by id", error);
            throw new Error(error);
        })

        if (!bookRecord) throw new Error("Book not found");
        if(bookRecord.status === "checked out" || bookRecord.quantity === 0) throw new Error("Book is not available for borrow");

        if(bookRecord.quantity > 0) {
            bookRecord.quantity -= 1;
        }

        bookRecord.status = BookStatus.CHECKED_OUT;
        const updatedBookRecord = await BookModel.findOneAndUpdate({isbn}, bookRecord, {new: true})
        .catch((error) => {
            console.error("There was an error updating book", error);
            throw new Error(error);
        })

    }
}