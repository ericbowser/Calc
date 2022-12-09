const express = require('express');
const bodyParser = require('body-parser');
const math = require('mathjs');
const router = express.Router();
router.use(bodyParser.json());
const Connection = require('tedious').Connection;


function connect() {
    const config = {
        // server: '192.168.137.1',
        authentication: {
            // instanceName: 'Eric-MSI-LT\\LOCALDB#EC3FD892',
            type: 'default',
            options: {
                userName: 'sa', // update me
                password: '' // update me
            }
        },
        options: {
            database: 'Calc'
        }
    }
    const connection = new Connection(config);
    connection.connect((err) => {
        if (err) {
            console.log('Connection Failed');
            throw err;
        } else {
            console.log('No errors');
        }

        // executeStatement();
    });
    
}


router.post("/login", (req, res) => {
    const user = req.body;
    
    // console.log(connection);
    connect();
    // console.log("obj", req);
    // console.log("obj", user);
    console.log("user name:", user.username);
    console.log("password", user.password);

    const username = user.username || undefined;
    const password = user.password || undefined;

    if (!username || !password) {
        res.status(400).send();
    }

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