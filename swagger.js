const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Courtney's API",
        description: "Courtney's API for Backend II"
    },
    host: 'web-backend-ii-w01-04.onrender.com',
    schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointFiles, doc);