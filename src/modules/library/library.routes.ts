import express from 'express';
import bookRoutes from './routes/book.routes';

const router = express.Router();

// Use the book routes
router.use('/', bookRoutes);

export default router;