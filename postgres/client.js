const {Client} = require('pg');
const dotenv = require("dotenv").config();

const connectionString = dotenv.parsed.DB_CONNECTION_STRING;

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