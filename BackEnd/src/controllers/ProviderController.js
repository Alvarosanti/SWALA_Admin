const Provider = require('../models/Provider')
const fs = require('fs-extra')
const sgMail = require('../services/sendgrid')


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

const sendEmailProvider = async (req, res) => {
    try {
        const { nombre, codigoRecurso, precio, stock, unidadMedida, numeroOc } = req.body;
        let proveedor = await Provider.find({ recurso: nombre })
        let date = new Date();
        let dateCreated = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        const msg = {
            to: proveedor[0].correo,
            from: 'alvarosantisteban56@gmail.com',
            templateId: 'd-b10787895cb44b3eb7b6729fe074025a',
            dynamicTemplateData: {
                subject: `Orden de compra - ${nombre}`,
                nombreProducto: nombre,
                codigoRecurso: `#${codigoRecurso}`,
                precioRecurso: `S/.${precio}`,
                cantidadProducto: stock,
                unidadMedida: unidadMedida,
                subtotal: precio * stock,
                nombreProveedor: proveedor[0].razon_social,
                correoProveedor: proveedor[0].correo,
                proveedorRuc: proveedor[0].ruc,
                numeroOc: `#${numeroOc}`,
                fechaCreacion: dateCreated,

            },
        }
        await sgMail.send(msg)
    } catch (error) {
        console.log("🚀 ~ file: ProviderController.js ~ line 94 ~ sendEmailProvider ~ error", error)
        return res.status(error.code).send(error.message);
    }
    res.status(201).send({ success: true })
}

module.exports = {
    getProviders,
    createProvider,
    getOneProvider,
    updateProvider,
    updateProviderState,
    deleteProvider,
    sendEmailProvider
};