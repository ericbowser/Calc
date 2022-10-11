const express = require('express')
// const router = require('express-router')
const app = express();
var sql = require('mssql')
const {re} = require("mathjs");

// app.METHOD(PATH, HANDLER)
console.log('passed port to use', process.env.port | 3000);
const port = process.env.port | 3000;

app.get("/", (req , res) => {
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
