const express = require('express');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const connectDb = require('./config/connectionDB');

dotenv.config();
connectDb;

JWT_SECRET = "dkshyfgasuifiso";

const app = express();

app.use(express.json());


app.use('/api/auth', require('./routes/user.routes'));

app.use('/api/admin/authentication')

app.listen(process.env.PORT,()=>{
    console.log('server is running on port 3000');
})