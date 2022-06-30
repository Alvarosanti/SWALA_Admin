const Provider = require('../models/Provider')
const fs = require('fs-extra')


const getProviders = async (req, res) => {
    try {
        const providers = await Provider.find();
        res.json({ providers })
    } catch (error) {
        return res.status(500).json({ message: error.messag })
    }
}

const createProvider = async (req, res) => {
    try {
        const { razon_social, ruc, correo, contacto, celular, descuento, recurso } = req.body;
        const newProvider = new Provider({
            razon_social,
            ruc,
            correo,
            contacto,
            celular,
            estado: 'habilitado',
            descuento,
            recurso,
        });
        await newProvider.save();
        res.json({ message: 'Provider saved', newProvider })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.messag })
    }
};

const getOneProvider = async (req, res) => {
    try {
        const id = req.params.id
        const provider = await Provider.findById(id)
        if (!provider) return res.sendStatus(404)
        return res.json({ provider })
    } catch (error) {
        return res.status(500).json({ message: error.messag })
    }
}

const updateProvider = async (req, res) => {
    try {
        const { razon_social, ruc, correo, contacto, celular, descuento, recurso } = req.body;
        const id = { _id: req.params.id };
        await Provider.findOneAndUpdate(id, {
            razon_social,
            ruc,
            correo,
            contacto,
            celular,
            descuento,
            recurso,
        })
        res.json({ message: 'provider updated' })
    } catch (error) {
        return res.status(500).json({ message: error.messag })
    }
}

const updateProviderState = async (req, res) => {
    try {
        const { estado } = req.body;
        const id = { _id: req.params.id };
        await Provider.findOneAndUpdate(id, {
            estado,
        })
        res.send()
    } catch (error) {
        console.log("🚀 ~ file: ProviderController.js ~ line 78 ~ updateProviderState ~ error", error)
        throw error
    }
}

const deleteProvider = async (req, res) => {
    try {
        const id = req.params.ruc
        await Provider.findByIdAndDelete(id)
        console.log(`Provider con id: ${id} eliminada`)
        res.json({ message: 'Provider deleted' })
    } catch (error) {
        return res.status(500).json({ message: error.messag })
    }
}

module.exports = {
    getProviders,
    createProvider,
    getOneProvider,
    updateProvider,
    updateProviderState,
    deleteProvider,
};