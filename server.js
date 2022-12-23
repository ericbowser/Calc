const express = require('express');
const bodyParser = require('body-parser');
const math = require('mathjs');
const router = express.Router();
router.use(bodyParser.json());
const { Client } = require('pg');

async function connect() {
    const connectionString = "postgres://postgres:1006@localhost:5433/postgres";
    
    try {
        const client = new Client({
            connectionString: connectionString
        });

        client.connect();
        return client;
    } catch(e) {
        console.log(e);
        throw e;
    }
}


router.post("/login", async (req, res) => {
    const user = req.body;
    
    const username = user?.username;
    const password = user?.password;
    
    if (username === undefined || password === undefined) {
        return res.status(400).send();
    }
    
    const client = await connect();
    let values = [];
    
    const selectUser = 'SELECT * FROM public."User" WHERE "User".userName = $1';
    values = [username];
    
    try {
        const result = await client.query(selectUser, values);
        console.log(result);
        if(result) {
            return res.status(200).send('duplicate user');
        }
    } catch(e) {
        console.log(e);
    }
    
    const insertUser = 'INSERT INTO public."User"("userId", "userName", "password", "isActive") VALUES ($1, $2, $3, $4)';
    values = [2, username, password, true];
    
    // const selectUsers = 'select * from public."User";'
    try {
        await client.query(insertUser, values);
    } catch(e) {
       console.log(e);
    }
    
    await client.end();

    res.status(200).send();
})

router.post("/add", (req, res) => {
    const operands = req.body;

    const left = operands.left || undefined;
    const right = operands.right || undefined;

    if (!left || !right) {
        res.status(400).send();
    }

    const result = math.add(left, right);

    const response = { result };

    res.status(200).send(response);
})

router.post("/sub", (req, res) => {
    const operands = req.body;

    const left = operands.left || undefined;
    const right = operands.right || undefined;

    if (!left || !right) {
        res.status(400).send();
    }

    const result = math.subtract(left, right);

    const response = { result };

    res.status(200).send(response);
})

router.post("/mult", (req, res) => {
    const operands = req.body;

    const left = operands.left || undefined;
    const right = operands.right || undefined;

    if (!left || !right) {
        res.status(400).send();
    }

    const result = math.multiply(left, right);
    const response = {result};

    res.status(200).send(response);
})

router.post("/div", (req, res) => {
    const operands = req.body;

    const left = operands.left || undefined;
    const right = operands.right || undefined;

    if (!left || !right) {
        res.status(400).send();
    }

    const result = math.divide(left, right);
    const response = {result};

    res.status(200).send(response);
})

router.post("/sqrt", (req, res) => {
    const number = req.body;

    const sqrt = number.sqrt || undefined;

    if (!sqrt) {
        res.status(400).send();
    }

    const result = math.sqrt(sqrt);
    const response = {result};

    res.status(200).send(response);
})

router.post("rand", () => {
    res.status(200).send(() => console.log("TODO"));
})

module.exports = router;