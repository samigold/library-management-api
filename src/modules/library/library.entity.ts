import { BookStatus } from "../../shared/constants/book-status.enum";
import { BookRecord } from "./model/book.record";

export interface LibraryEntity {
    id: string;
    title: string;
    author: string;
    isbn: string;
    status: BookStatus;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export const LibraryEntity = {
    fromRecordToEntity: (record: BookRecord): LibraryEntity => {
        return {
            id: record.id,
            title: record.title,
            author: record.author,
            isbn: record.isbn,
            status: record.status,
            quantity: record.quantity,
            
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
        };
    }
}