const express = require('express');
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');
const connectDb = require('./config/connectionDB');
const { adminRouter } = require('./routes/admin.routes');
const { courseRouter } = require('./routes/course.routes');
const { router } = require('./routes/user.routes');

adminRouter

dotenv.config();
connectDb;

JWT_SECRET = "dkshyfgasuifiso";

const app = express();

app.use(express.json());


app.use('/api/auth', require('./routes/user.routes'));
app.use("/api/v1/user", router);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

app.listen(process.env.PORT,()=>{
    console.log('server is running on port 3000');
})