const express = require('express');

let appRouter = express.Router();

module.exports = appRouter;

appRouter.get('/', (req,res) => {
    model = {
        msg: "Home page",
        tittle: "Invoices - Home"
    };
    res.render('index',model);
});