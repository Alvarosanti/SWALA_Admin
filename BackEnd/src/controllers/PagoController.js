const Pagos = require('../models/Pagos')
const fs = require('fs-extra')


const getPagos = async (req, res) => {
    try {
        const pagos = await Pagos.find();
        res.json({ pagos })
    } catch (error) {
        return res.status(500).json({ message: error.messag })
    }
}

const getOnePagos = async (req,res) => {
    try{
        const id = req.params.id
        const pagos = await Pagos.findById(id)
        if(!pagos) return res.sendStatus(404)
        return res.json({pagos})
    } catch(error) {
        return res.status(500).json({message:error.messag})
    }
}

module.exports = {
    getPagos,
    getOnePagos,
};