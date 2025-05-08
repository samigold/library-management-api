import { Types } from 'mongoose';
import { BookStatus } from "../../../shared/constants/book-status.enum";

export interface BookRecord {
  _id?: Types.ObjectId;
  id: string;
  title: string;
  author: string;
  isbn: string;
  status: BookStatus;
  quantity: number;
  createdAt?: Date;
    updatedAt?: Date;  
}