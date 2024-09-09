const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: false },
        coo: { type: String, required: false }
    },
    { timestamps: false }
)

module.exports = mongoose.model('products', Product)