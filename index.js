const express = require('express')
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const server = require('./server');
const cors = require('cors');
const https = require('node:https');
const http = require('node:http');
const dotenv = require("dotenv");
const Path = require('path');
const config = dotenv.config({path: Path.resolve(__dirname, '.env')});

const httpsPort = config.parsed.HTTPS_PORT || 8081;
const httpPort = config.parsed.HTTP_PORT || 8082;

console.log('passed port to use for https', httpsPort);
console.log('passed port to use for http', httpPort);

const app = express();
app.use(server);
app.use(cors());
const httpsServer = https.createServer(app);
const httpServer = http.createServer(app);

let options = {
    definition: {
        schemes: ['http', 'https'],
        openapi: "3.0.0",
        info: {
            title: "Calc API",
            version: "1.0.0",
            description: "A simple Express Calc API",
            contact: {
                name: "API Support",
                url: `http://localhost:${httpPort}/`,
                email: "erbows@collar-culture.com",
            },
        },

        servers: [
            {
                url: `https://localhost:${httpsPort}/`,
                description: "My HTTPS API Documentation",
            },
            {
                url: `http://localhost:${httpPort}/`,
                description: "My HTTP API Documentation",
            },
        ],
    },
    apis: ['./docs/openapi_3.yaml'],
}
const specs = swaggerJsdoc(options);

app.use("/", swaggerUI.serve, swaggerUI.setup(specs));
httpsServer.listen(httpsPort, () => console.log(`Listening on port ${httpsPort}`));
httpServer.listen(httpPort, () => console.log(`Listening on port ${httpPort}`));
