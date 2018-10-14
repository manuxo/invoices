const express = require('express');

let userRouter = express.Router();

module.exports = userRouter;

userRouter.get('/', (req,res) => {
    res.status(200).send("Users");
});

