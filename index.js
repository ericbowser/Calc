"use strict";
const express = require('express')
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const server = require('./server');
const cors = require('cors');
const https = require('node:https');
const fs = require('fs');

const httpsOptions = {
    key: fs.readFileSync('certs/privatekey.pem'),
    cert: fs.readFileSync('certs/cert.pem'),
};
console.log(httpsOptions);

const port = process.env.PORT || 34349;
console.log('passed port to use', port);
const app = express();
app.use(server);
app.use(cors());
const httpsServer = https.createServer(httpsOptions, app);

let options = {
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
                url: "https://localhost:34349",
                description: "My API Documentation",
            },
        ],
    },
    apis: ['./docs/openapi_3.yaml'],
}
const specs = swaggerJsdoc(options);

app.use("/", swaggerUI.serve, swaggerUI.setup(specs));
httpsServer.listen(port, () => console.log(`Listening on port ${port}`))