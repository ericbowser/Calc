const {Client} = require('pg');
const dotenv = require("dotenv");
const path = require('path');

// Change .env based on local dev or prod
const env = path.resolve(__dirname, '../env/.env');
const options = {
  path: env
};
const config = dotenv.config(options);
console.log('config', config);

const connectionString =
  `postgres://${config.parsed.DB_USER}:${config.parsed.DB_PASSWORD}@${config.parsed.DB_SERVER}:${config.parsed.DB_PORT}/postgres`;

console.log(connectionString);

async function connect() {
  console.log("config in server", config, connectionString);
  let client = null;
  try {
    client = new Client({
      connectionString: connectionString,
      ssl: false
    });

    await client.connect();
    return client;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {connect};