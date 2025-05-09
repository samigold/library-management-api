# Library Management API

A RESTful API for a library management system built with Node.js, Express.js, TypeScript, and MongoDB.

## Features

- Book management (add, update, delete, view)
- Book borrowing system
- Swagger API documentation
- TypeScript support
- Error handling middleware
- MongoDB integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **Documentation**: Swagger (OpenAPI 3.0.0)
- **ODM**: Mongoose
- **Other**: dotenv, module-alias

## API Endpoints

### Books

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /library | Get all books |
| GET    | /library/:isbn | Get book by ISBN |
| POST   | /library | Add a new book |
| PUT    | /library/:isbn | Update a book |
| DELETE | /library/:isbn | Delete a book |
| POST   | /library/borrow | Borrow a book |
| POST   | /library/return | Return a book |

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local instance or Atlas)

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment setup**

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/library-management
NODE_ENV=development
```

Replace the MONGODB_URI with your actual MongoDB connection string.

4. **Start development server**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

6. **Start production server**

```bash
npm start
```

## API Documentation

The API is documented using Swagger. When the server is running, you can access the API documentation at:

```
http://localhost:3000/api-docs
```

## Request and Response Examples

### Add a Book

**Request:**

```http
POST /library
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "9780743273565",
  "status": "available",
  "totalQuantity": 5,
  "availableQuantity": 5
}
```

**Response:**

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": "60a9b4e8c9e4c62b1c9b4e8c",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "9780743273565",
    "status": "available",
    "totalQuantity": 5,
    "availableQuantity": 5,
    "createdAt": "2025-05-09T12:00:00.000Z",
    "updatedAt": "2025-05-09T12:00:00.000Z"
  }
}
```

### Borrow a Book

**Request:**

```http
POST /library/borrow
Content-Type: application/json

{
  "isbn": "9780743273565"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "id": "60a9b4e8c9e4c62b1c9b4e8c",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "9780743273565",
    "status": "available",
    "totalQuantity": 5,
    "availableQuantity": 4,
    "createdAt": "2025-05-09T12:00:00.000Z",
    "updatedAt": "2025-05-09T12:05:00.000Z"
  }
}
```

## Error Handling

The API uses standard HTTP status codes for errors:
- 400: Bad Request - Invalid input
- 404: Not Found - Resource doesn't exist
- 409: Conflict - Resource already exists
- 500: Internal Server Error

Example error response:

```json
{
  "success": false,
  "error": "NotFoundError",
  "message": "Book not found"
}
```

## Deployment

The API is deployed on [Render](https://render.com).
Live URL: [https://library-management-api-irtc.onrender.com](https://library-management-api-irtc.onrender.com)

## Running Tests

```bash
npm test
```

## Project Structure

```
src/
├── app.ts                 # Express application setup
├── index.ts               # Entry point
├── infrastructure/        # Infrastructure setup
│   ├── config/            # Configuration files
│   └── db/                # Database connection
├── middleware/            # Application middleware
├── modules/               # Feature modules
│   └── library/           # Library module
│       ├── model/         # Database models
│       ├── routes/        # Route definitions with swagger docs
│       └── ...            # Controllers, services, etc.
└── shared/                # Shared utilities and constants
    ├── constants/         # Application constants
    └── errors/            # Custom error classes
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
