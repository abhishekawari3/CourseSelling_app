const mongoose = require('mongoose');

const connectDb =async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/course-selling-app');
        console.log('connected to DB');
    } catch(err){
        console.log('error while connecting to DB, error: ', err);
    }
}

module.exports = connectDb;