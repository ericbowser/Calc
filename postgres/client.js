const { Client } = require('pg');
const dotenv = require("dotenv");
const config = dotenv.config();

const connectionString = 'postgresql://linpostgres:8nr7zwBT-myFQYaP@lin-13722-4143-pgsql-primary.servers.linodedb.net:5432/postgres';
    // `postgres://${config.parsed.DB_USER}:${config.parsed.DB_PASSWORD}@${config.parsed.DB_SERVER}:${config.parsed.DB_PORT}/${config.parsed.DB_USER}`;

async function connect() {
    console.log("config in server", config, connectionString);
    let client = null;
    try {
        client = new Client({
            connectionString: connectionString,
            ssl: 'no-verify'
        });

        await client.connect();
        return client;
    } catch(e) {
        console.log(e);
    }
}

module.exports = {connect};