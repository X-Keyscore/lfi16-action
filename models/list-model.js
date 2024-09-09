const mongoose = require('mongoose')
const Schema = mongoose.Schema

const List = new Schema(
    {
        title: { type: String, required: false},
        products: []
    },
    { timestamps: false }
)

module.exports = mongoose.model('lists', List)
