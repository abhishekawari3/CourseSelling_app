const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})

const course = mongoose.model("Course", courseSchema);