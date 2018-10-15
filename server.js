//Dependencies
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');


//Init Application

const PORT = process.env.PORT || 3000;
const app = express();

//View engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//Config - CORS

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

//Public
app.use(express.static(path.join(__dirname,'public')));

//Routes
const appRouter = require('./routes/app-router');
const customerRouter = require('./routes/api/customer-router');
const invoiceRouter = require('./routes/api/invoice-router');

app.use('/',appRouter);
app.use('/api/customers',customerRouter);
app.use('/api/invoices',invoiceRouter);

app.use((err,req,res) => {
    if(err.status)
        res.status(err.status).send(err.message);
    else
        res.status(500).send();
});

const server =http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});