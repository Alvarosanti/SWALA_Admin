const { Schema, model } = require('mongoose')

const OCSchema = new Schema({
    recursos: {
        type: Object,
    },
    nombreRecurso: {
        tyep: String,
    },
    precioRecurso: {
        type: Number,
    },
    cantidadPedido: {
        type: Number,
    },
    unidadMedida: {
        type: String,
    },
    subtotal: {
        type: Number,
    },
    numeroOc: {
        type: String,
        trim: true
    },
    proveedor_ruc: {
        type: String,
    },
    razon_social: {
        type: String,
    },
    estado: {
        type: String,
        required: true
    },
    total: {
        type: Number,
    },
    fechaCreacion: {
        type: String,
    },
    fechaEntrega: {
        type: Date,
    },
}, {
    timestamps: true,
    versionKey: false
}
)

module.exports = model('OCompra', OCSchema, 'OCompra')