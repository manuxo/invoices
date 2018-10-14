const express = require('express');

let appRouter = express.Router();

module.exports = appRouter;

appRouter.get('/', (req,res) => {
    model = {
        msg: "Login page",
        tittle: "Login"
    };
    res.render('login',model);
});