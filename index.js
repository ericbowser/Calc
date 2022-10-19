const express = require('express')
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const server = require('./server');

console.log('passed port to use', 5000);
const port = 5000;
const app = express();
app.use(server);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Calc API",
            version: "1.0.0",
            description: "A simple Express Calc API",
            contact: {
                name: "API Support",
                url: "https://engineer-it-all.com",
                email: "eric@erb-tech.com",
            },
        },

        servers: [
            {
                url: "http://localhost:3000",
                description: "My API Documentation",
            },
        ],
    },
    apis: ['./docs/openapi_3.yaml'],
}

const specs = swaggerJsdoc(options);
app.use("/", swaggerUI.serve, swaggerUI.setup(specs));
app.listen(port, () => console.log(`Listening on port ${port}`))
