import { BookStatus } from "../../shared/constants/book-status.enum";

export interface ICreateBook {
    title: string;
    author: string;
    status: BookStatus;
    isbn: string;
    totalQuantity: number;
    availableQuantity: number;
}