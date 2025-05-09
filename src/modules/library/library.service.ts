import BookModel from "./model/Book";
import { ICreateBook } from "./library.types";
import { LibraryEntity } from "./library.entity";
import { BookStatus } from "../../shared/constants/book-status.enum";
import { NotFoundError, InternalServerError, BadRequestError } from "../../shared/errors";


export const LibraryService = {
    fetchById: async (isbn: string) => {
        const bookRecord = await BookModel.findOne({isbn})
        .catch((error) => {
            console.error("There was an error fetching book by id", error);
            throw new Error(error);
        })

        if (!bookRecord) throw new NotFoundError("Book not found");

        return LibraryEntity.fromRecordToEntity(bookRecord);
    },
    fetchByIsbn: async (isbn: string) => {
        try{
        const bookRecord = await BookModel.findOne({isbn})

        if(!bookRecord) return null;
        return LibraryEntity.fromRecordToEntity(bookRecord);
        } catch (error) {
            console.error("There was an error fetching book by id", error);
            throw new InternalServerError("There was an error fetching book by id");
        }
    },

    fetchAll: async () => {
        const bookRecords = await BookModel.find({})

        if (!bookRecords) throw new NotFoundError("Books not found");

        return bookRecords.map((record) => LibraryEntity.fromRecordToEntity(record));

    },

    create: async (book: ICreateBook) : Promise<LibraryEntity> => {
        const createdBookRecord = await BookModel.create({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            status: book.status,
            totalQuantity: book.totalQuantity,
            availableQuantity: book.availableQuantity,
        })

        if (!createdBookRecord) {
            console.error("There was an error creating book", createdBookRecord);
            throw new InternalServerError("There was an error creating book");
        }
        return LibraryEntity.fromRecordToEntity(createdBookRecord);
    },
    delete: async (isbn: string) => {
        const deletedBookRecord = await BookModel.findOneAndDelete({isbn})
        .catch((error) => {
            console.error("There was an error deleting book", error);
            throw new InternalServerError("There was an error deleting book");
        })

        if (!deletedBookRecord) {
            throw new NotFoundError('Book not found');
        };

        return LibraryEntity.fromRecordToEntity(deletedBookRecord);
    },
    borrow: async (isbn: string) => {
        const bookRecord = await BookModel.findOne({isbn})

        if (!bookRecord) throw new NotFoundError("Book not found");

        if(bookRecord.availableQuantity === 0) {
            console.error("Book is not available for checkout");
            throw new BadRequestError("Book is not available for checkout");
        }

        if(bookRecord.availableQuantity > 0) {
            bookRecord.availableQuantity -= 1;
        }

        bookRecord.status = BookStatus.CHECKED_OUT;
        const updatedBookRecord = await BookModel.findOneAndUpdate({isbn}, bookRecord, {new: true})
        .catch((error) => {
            console.error("There was an error updating book", error);
            throw new InternalServerError("There was an error updating book");
        })

        if (!updatedBookRecord) throw new NotFoundError("Book not found");

        return LibraryEntity.fromRecordToEntity(updatedBookRecord);

    },
    return: async (isbn: string) => {
        const bookRecord = await BookModel.findOne({isbn})

        if (!bookRecord) throw new NotFoundError("Book not found");

        if(bookRecord.status === "available" || bookRecord.availableQuantity === bookRecord.totalQuantity) {
            console.error("Book is not available for return");
            throw new BadRequestError("Book is not available for return");
        }

        if(bookRecord.availableQuantity < bookRecord.totalQuantity) {
            bookRecord.availableQuantity += 1;
        }

        if(bookRecord.availableQuantity === bookRecord.totalQuantity) {
            bookRecord.status = BookStatus.AVAILABLE;
        }

        const updatedBookRecord = await BookModel.findOneAndUpdate({isbn}, bookRecord, {new: true})
        if (!updatedBookRecord) throw new NotFoundError("Book not found");

        return LibraryEntity.fromRecordToEntity(updatedBookRecord);
    }

}