import express from 'express';
import dotenv from 'dotenv';
import { dbConn } from './infrastructure/db/dbConn';
import LibraryRoutes from './modules/library/library.routes';
import { errorHandlerMiddleware } from './shared/middleware/errorHandler';
import { setupSwagger } from './infrastructure/config/swagger';

dotenv.config();
dbConn(); // Connect to the database

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies
app.use('/library', LibraryRoutes); // Mount the library routes to the /library path

// Set up Swagger documentation
setupSwagger(app);

// Error handler middleware should be after all routes
app.use(errorHandlerMiddleware); 

app.get('/', (req, res) => {
  res.send("<h1>Welcome to the Library API</h1>");
});

app.listen(Number(process.env.PORT) || 3000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    console.log(`API Documentation available at http://localhost:${process.env.PORT || 3000}/api-docs`);
})

export default app;