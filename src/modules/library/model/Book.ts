import mongoose from "mongoose";
import { BookStatus } from "../../../shared/constants/book-status.enum";
import { BookRecord } from "./book.record";

const BookSchema = new mongoose.Schema<BookRecord>({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: BookStatus,
        default: BookStatus.AVAILABLE,
    },
    totalQuantity: {
       type: Number,
       default: 1, 
    },
    availableQuantity: {
        type: Number,
        default: 1,
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const BookModel = mongoose.model("Book", BookSchema);
export default BookModel;