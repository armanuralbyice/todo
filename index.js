const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoHandler = require('./routerHandler/todoHandler');
const userHandler = require('./routerHandler/userHandler');

const app = express();
dotenv.config();
app.use(express.json());

// mongoose connection
mongoose.set('strictQuery', true);
mongoose
    .connect('mongodb://127.0.0.1:27017/todo')
    .then(() => console.log('connection successfully'))
    .catch((err) => console.log(err));

// use router
app.use('/todo', todoHandler);
app.use('/user', userHandler);

// defult errorHandler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        next(err);
    }
    res.status(500).json({ error: err });
};
app.use(errorHandler);

// server listening port
app.listen(3000, () => {
    console.log('listening port is 3000');
});
