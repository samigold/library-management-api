import { BookStatus } from "../../shared/constants/book-status.enum";
import { BookRecord } from "./model/book.record";

export interface LibraryEntity {
    id: string;
    title: string;
    author: string;
    isbn: string;
    status: BookStatus;
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
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
        };
    }
}