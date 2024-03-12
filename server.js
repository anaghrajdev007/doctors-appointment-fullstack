const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();
//rest object

const app = express();


//Middleware
app.use(express.json())
app.use(morgan('dev'))


//Route
const user_data = require("./routes/userRoutes");
app.use('/api/v1/user', user_data);

//Admin Pages
const admin_data = require("./routes/adminRoutes");
app.use('/api/v1/admin',admin_data);
//Listen

const port = process.env.PORT || 9000;

app.listen(port , ()=>{
    console.log(`server engagged on port ${port}`);
});

//nodemon server.js