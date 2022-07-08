const OC = require('../models/OCompra')
const Provider = require('../models/Provider')
const sgMail = require('../services/sendgrid')




const getOC = async (req, res) => {
    try {
        const oc = await OC.find();
        res.json({ oc })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const createOC = async (req, res) => {
    try {
        const {
            nombreRecurso,
            precioRecurso,
            cantidadPedido,
            codigoRecurso,
            unidadMedida,
            numeroOc,
        } = req.body;
        let date = new Date();
        let dateCreated = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        let proveedor = await Provider.find({ recurso: nombreRecurso })
        let nombreProveedor = proveedor[0].razon_social
        let ru = proveedor[0].ruc
        let provEmail = proveedor[0].correo
        let subt = precioRecurso * cantidadPedido
        //new order
        const newOc = new OC({
            numeroOc,
            proveedor_ruc: ru,
            razon_social: nombreProveedor,
            estado: "pendiente",
            fechaCreacion: dateCreated,
            recursos: {
                nombreRecurso,
                precioRecurso,
                cantidadPedido,
                unidadMedida,
                subtotal: subt,
            },
        });
        await newOc.save();
        //send email
        const msg = {
            to: provEmail,
            from: 'alvarosantisteban56@gmail.com',
            templateId: 'd-b10787895cb44b3eb7b6729fe074025a',
            dynamicTemplateData: {
                subject: `Orden de compra - ${nombreRecurso}`,
                nombreProducto: nombreRecurso,
                codigoRecurso: `#${codigoRecurso}`,
                precioRecurso: `S/.${precioRecurso}`,
                cantidadProducto: `${cantidadPedido} ${unidadMedida}`,
                subtotal: `S/.${subt}`,
                nombreProveedor: nombreProveedor,
                correoProveedor: provEmail,
                proveedorRuc: ru,
                numeroOc: `#${numeroOc}`,
                fechaCreacion: dateCreated,
            },
        }
        await sgMail.send(msg)
        res.json({ message: 'Oc saved', newOc })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getOneOC = async (req, res) => {
    try {
        const id = req.params.id
        const oc = await OC.findById(id)
        if (!oc) return res.sendStatus(404)
        return res.json({ oc })
    } catch (error) {
        return res.status(500).json({ message: error.messag })
    }
}

const updateOC = (req, res) => {
    res.json({ message: 'user updated' })
}

const deleteOC = (req, res) => {
    res.json({ message: 'user deleted' })
}

module.exports = {
    getOC,
    createOC,
    getOneOC,
    updateOC,
    deleteOC,
};