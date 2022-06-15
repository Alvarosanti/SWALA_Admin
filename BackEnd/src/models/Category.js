const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
    nombre: { type: String },
})
module.exports = model('Category', CategorySchema, 'Category')