const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    contraseña: {
        type: String,
        required: true
    },
    rol: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
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

module.exports = model('User', UserSchema, 'User')