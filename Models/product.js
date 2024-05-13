const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: String,
    price: Number,
    category:String
});

const User = mongoose.model('Product', productSchema);

module.exports = User;