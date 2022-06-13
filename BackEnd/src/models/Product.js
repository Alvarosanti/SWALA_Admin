const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
    producto_id: {
        type: Number,
        trim: true,
    },
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    precio: {
        type: Number,
        trim: true,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
    },
    categoria: {
        type: String,
        required: true,
    },
    check: {
        type: Boolean,
        default: false,
    },
    sold: {
        type: Number,
        default: 0
    },
    estado: {
        type: String,
    },
    images: {
        url: String,
        public_id: String,
        type: Array
    },
}
    , {
        timestamps: true,
        versionKey: false
    })

module.exports = model('Product', ProductSchema, 'Product')