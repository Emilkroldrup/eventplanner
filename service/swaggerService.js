const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Event Planner API',
      version: '1.0.0',
      description: 'API documentation for the Event Planner app',
    },
    tags: [
      {
        name: 'Users',
        description: 'Operations related to user management',
      },
      {
        name: 'Events',
        description: 'Operations related to event management',
      },
      {
        name: 'Auth',
        description: 'Authentication and authorization operations',
      },
    ],
    servers: [
      {
        url: 'http://localhost:${process.env.PORT}',
      },
    ],
  },
  apis: ['./routes/*.js'],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

module.exports = setupSwagger;
