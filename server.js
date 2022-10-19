const express = require('express');
const bodyParser = require('body-parser');
const math = require('mathjs');
const sql = require('mssql')

const router = express.Router();
router.use(bodyParser.json());

function badRequest(operands) {
    const { leftOperand, rightOperand } = operands;

    const badRequest = {
        error: "One of the operands or both are invalid numbers",
        paramaters: `left operand: ${leftOperand} right operand: ${rightOperand}`
    };

    if (!leftOperand || !rightOperand) {
        return badRequest;
    }

    return true;
}

router.get("/", (req , res) => {
    console.log("default route");
    console.log("Fetching users");

    const config = {
        user: 'test',
        password: 'test',
        server: '(localdb)\MSSQLLocalDB',
        database: 'Login'
    }

    sql.connect(config, () => {
        console.log('connected to db');
    });


    const result = sql.query("SELECT * FROM [dbo].[User]")
        .then(res => {
            console.log(res)
        });

    console.log("fetched result: ", result);
    sql.close();

    return result;
})

router.post("/add", (req, res) => {
    const operands = req.body;

    const leftOperand = operands.leftOperand || undefined;
    const rightOperand = operands.rightOperand || undefined;

    if (!leftOperand || !rightOperand) {
        const response = {
            error: "One of the operands or both are invalid numbers",
            paramaters: `left operand: ${leftOperand} right operand: ${rightOperand}`
        };

        res.status(400).send(response);
    }

    const result = math.add(leftOperand, rightOperand);

    const response = { result };

    res.status(200).send(response);
})

router.post("/sub", (req, res) => {
    const operands = req.body;

    const leftOperand = operands.leftOperand || undefined;
    const rightOperand = operands.rightOperand || undefined;

    if (!leftOperand || !rightOperand) {
        const response = {
            error: "One of the operands or both are invalid numbers",
            paramaters: `left operand: ${leftOperand} right operand: ${rightOperand}`
        };

        res.status(400).send(response);
    }

    const result = math.subtract(leftOperand, rightOperand);

    res.status(200).send(result);
})

router.post("/mult", (req, res) => {
    const operands = req.body;

    const leftOperand = operands.leftOperand || undefined;
    const rightOperand = operands.rightOperand || undefined;

    const isReqValid = badRequest(operands);

    res.status(400).send(response);

    const result = math.subtract(leftOperand, rightOperand);

    res.status(200).send(response);
})

// router.post("/div", (req, res) => {
//     // const x = app.request.get("");
//     console.log("called divide operation");
//     res.send(10);
// })

module.exports = router;