const { Schema, model } = require('mongoose')

const ProviderSchema = new Schema({
    ruc: {
        type: Number,
        trim: true,
        required: true
    },
    razon_social: {
        type: String,
        trim: true,
    },
    correo: {
        type: String,
        trim: true,
        required: true
    },
    contacto: {
        type: String,
        required: true
    },
    celular: {
        type: Number,
    },
    estado: {
        type: String,
    },
    descuento: {
        type: Number,
    },
    productos: {
        type: String,
    }
}
    , {
        timestamps: true,
        versionKey: false
    })

module.exports = model('Provider', ProviderSchema, 'Provider')