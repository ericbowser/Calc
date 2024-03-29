const express = require('express')
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const server = require('./server');
const cors = require('cors');
const https = require('node:https');
const http = require('node:http');
const dotenv = require("dotenv");
const Path = require('path');
const config = dotenv.config({path: Path.resolve(__dirname, 'env/.env')});

/*
const httpsOptions = {
    key: fs.readFileSync('certs/privatekey.pem'),
    cert: fs.readFileSync('certs/cert.pem'),
};
*/

const httpsPort = config.parsed.HTTPS_PORT || 34349;
const httpPort = config.parsed.HTTP_PORT || 34350;
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
                url: "http://localhost:34349/",
                email: "eric.bowser@maersk.com",
            },
        },

        servers: [
            {
                url: "https://localhost:34350/",
                description: "My HTTPS API Documentation",
            },
            {
                url: "http://localhost:34349/",
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
