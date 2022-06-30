const { Schema, model } = require('mongoose')

const OCSchema = new Schema({
    numeroOC: {
        type: String,
        required: true,
        trim: true
    },
    proveedor_id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    estado: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        default: 0
    },
    recursos: {
        type: String,
        default: []
    },
    fechaEntrega: {
        type: Date,
        required: false
    },

}, {
    timestamps: true,
    versionKey: false
}
)

module.exports = model('OCompra', OCSchema, 'OCompra')