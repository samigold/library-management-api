import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library Management API',
      version: '1.0.0',
      description: 'API documentation for Library Management System',
      contact: {
        name: 'API Support',
        email: 'support@library-api.com',
      },
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://your-production-url.com',
        description: 'Production server',
      },
    ],
    components: {
      schemas: {
        Book: {
          type: 'object',
          required: ['title', 'author', 'isbn'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the book',
            },
            title: {
              type: 'string',
              description: 'The title of the book',
            },
            author: {
              type: 'string',
              description: 'The author of the book',
            },
            isbn: {
              type: 'string',
              description: 'ISBN number of the book',
            },
            status: {
              type: 'string',
              enum: ['available', 'checked out', 'reserved', 'lost'],
              description: 'The status of the book',
            },
            totalQuantity: {
              type: 'number',
              description: 'Total quantity of this book in the library',
            },
            availableQuantity: {
              type: 'number',
              description: 'Number of copies available for checkout',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the book was added',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the book was last updated',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            error: {
              type: 'string',
              example: 'BadRequestError',
            },
            message: {
              type: 'string',
              example: 'Invalid input data',
            },
          },
        },
      },
      responses: {
        BadRequest: {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        InternalError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Books',
        description: 'Book management endpoints',
      },
    ],
  },
  apis: ['./src/modules/library/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
