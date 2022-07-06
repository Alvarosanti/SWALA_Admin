const { Schema, model } = require('mongoose')

const PagoSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    pago_id: {
        type: String,
        trim: true,
        required: true
    },
    usuario_id: {
        type: String,
        trim: true,
        required: true
    },
    direccion: {
        type: Object,
        required: true
    },
    cart: {
        type: Array,
        default: []
    },
    estado: {
        type: String,
        trim:true,
        required: true
    },
    fechaEntrega: {
        type: Date,
        required: false
    },
}
    , {
        timestamps: true,
        versionKey: false
    })

module.exports = model('pagos', PagoSchema, 'pagos')