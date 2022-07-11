const { Schema, model } = require('mongoose')

const RecursoSchema = new Schema({
    recurso_id: {
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
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    medida: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        default: false,
    },
    stockMinimo: {
        type: Number,
        default: false,
    },
    estado: {
        type: String,
    },
    alerta: {
        type: Boolean,
    },
    cantidadComprar: {
        type: Number,
    }
},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = model('Recurso', RecursoSchema, 'Recurso')