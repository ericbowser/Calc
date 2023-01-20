"use strict";
const express = require('express')
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const server = require('./server');
const cors = require('cors');
const https = require('node:https');
const http = require('node:http');
const fs = require('fs');
const dotenv = require("dotenv");
const config = dotenv.config();

const httpsOptions = {
    key: fs.readFileSync('certs/privatekey.pem'),
    cert: fs.readFileSync('certs/cert.pem'),
};
console.log(httpsOptions);

const httpsPort = config.parsed.HTTPS_PORT || 34349;
const httpPort = config.parsed.HTTP_PORT || 34361;
console.log('passed port to use for https', httpsPort);
console.log('passed port to use for http', httpPort);

const app = express();
app.use(server);
app.use(cors());
const httpsServer = https.createServer(httpsOptions, app);
const httpServer = http.createServer(app);

let options = {
    definition: {
        schemes: ['http'],
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
                url: "https://mytechsoles.com/",
                description: "My API Documentation",
            },
            {
                url: "http://localhost:34361/swagger",
                description: "My API Documentation",
            },
        ],
    },
    apis: ['./docs/openapi_3.yaml'],
}
const specs = swaggerJsdoc(options);

app.use("/", swaggerUI.serve, swaggerUI.setup(specs));
httpsServer.listen(httpsPort, () => console.log(`Listening on port ${httpsPort}`));
httpServer.listen(httpPort, () => console.log(`Listening on port ${httpPort}`));
