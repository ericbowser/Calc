const express = require('express');
const bodyParser = require('body-parser');
const math = require('mathjs');
const {login} = require('./postgres/login');
const {isEmpty} = require('lodash');

const router = express.Router();
router.use(bodyParser.json());

router.post("/login", async (req, res) => {
  const request = req.body;
  
  console.log('request', request);

  if (isEmpty(request?.username) || isEmpty(request?.password)) {
    res.status(400).send('Bad Request');
  }

  const status = await login(request);
  console.log('returned login status', status);

  switch (status) {
    case 200:
      console.log('success!');
      res.status(200).send('success');
    case 409:
      console.log('duplicate user');
      res.status(409).send("duplicate user");
    case 500:
      console.log('server error');
      res.status(500).send("server error");
  }
})

router.post("/add", (req, res) => {
  const operands = req.body;

  const left = operands.left || undefined;
  const right = operands.right || undefined;

  if (!left || !right) {
    res.status(400).send();
  }

  const result = math.add(left, right);

  const response = {result};

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

  const response = {result};

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