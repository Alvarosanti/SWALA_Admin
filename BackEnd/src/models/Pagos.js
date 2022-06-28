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
        type: String,
        trim: true,
        required: true
    },
    cart: {
        type: Array,
        default: []
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