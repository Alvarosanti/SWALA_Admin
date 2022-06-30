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
        trim: true,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
    },
    medida: {
        type: String,
        required: true,
    },
    stockMaximo: {
        type: Number,
        default: false,
    },
    stockMinimo: {
        type: Number,
        default: false,
    },
    estado: {
        type: String,
    }
},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = model('Recurso', RecursoSchema, 'Recurso')