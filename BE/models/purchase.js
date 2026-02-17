const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const purchaseSchema = new mongoose.Schema({
    courseId: ObjectId,
    userId: ObjectId,
})

const purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = purchase;