const express = require('express')
// const router = require('express-router')
const app = express();

// app.METHOD(PATH, HANDLER)
console.log('passed port to use', process.env.port | 3000);
const port = process.env.port | 3000;

app.get("/docs/openapi_3.yaml", (req, res) => {
    console.log("default route");
});

app.post("/add", (req, res) => {
    const x = app.request.get("leftOperand");
    console.log(x);
    res.send(x);
})

// router.post("/sub", (req, res) => {
//     const x = app.request.get("leftOperand");
//     console.log(x);
//     res.send(x);
// })
//
// router.post("/mult", (req, res) => {
//     const x = app.request.get("leftOperand");
//     console.log(x);
//     res.send(x);
// })
//
// router.post("/div", (req, res) => {
//     // const x = app.request.get("");
//     console.log("called divide operation");
//     res.send(10);
// })

app.listen(port, () => console.log(`Calc is listening on port ${port}`))
