import express from 'express';
import dotenv from 'dotenv';
import { dbConn } from './infrastructure/db/dbConn';
import LibraryRoutes from './modules/library/library.routes';
import { errorHandlerMiddleware } from './shared/middleware/errorHandler';

dotenv.config();
dbConn(); // Connect to the database

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies
app.use('/library', LibraryRoutes); // Mount the library routes to the /library path


app.use(errorHandlerMiddleware); // Middleware to handle errors

app.get('/', (req, res) => {
  res.send("<h1>Welcome to the Library API</h1>");
});

app.listen(Number(process.env.PORT) || 3000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})

export default app;