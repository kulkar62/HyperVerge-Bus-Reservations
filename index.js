const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dotenv = require('dotenv')
dotenv.config();



// import routes
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const reserveRoute = require('./routes/reserve')
const resetRoute = require('./routes/reset')



// connect to database
mongoose.connect(
    process.env.DB_CONNECT
    // , () => console.log('Connected to MongoDB Database')
);

// middleware
app.use(express.json());

// route middlewares
app.use('/', registerRoute)
app.use('/', loginRoute)
app.use('/', reserveRoute)
app.use('/', resetRoute)


app.listen(3000, () => console.log('Server is running on http://localhost:3000'));

module.exports = app