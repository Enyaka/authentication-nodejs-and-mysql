const express = require('express');
require('dotenv/config')
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

const loginRoute = require('./routes/authentication');
app.use('/auth',loginRoute);


app.listen('3000')