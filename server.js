﻿const express = require('express');
const bodyParser = require('body-parser');
const math = require('mathjs');
const router = express.Router();
router.use(bodyParser.json());

router.post("/login", (req, res) => {
    const user = req.body;

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