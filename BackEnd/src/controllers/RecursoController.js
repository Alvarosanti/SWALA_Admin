const Recurso = require('../models/Recurso')
const fs = require('fs-extra')

const getRecurso = async (req, res) => {
    try {
        const recurso = await Recurso.find();
        res.json({ recurso })
    } catch (error) {
        return res.status(500).json({ message: error.messag })
    }
}

const createRecurso = async (req, res) => {
    try {
        const { recurso_id, nombre, precio, descripcion, cantidad, medida, stock} = req.body;
        console.log('req body:', req.body)
        console.log('req file:', req.files)   

        const newRecurso = new Recurso({
            recurso_id,
            nombre,
            precio,
            descripcion,
            cantidad,
            medida,
            stock,
            estado: "habilitado",
        });
        await newRecurso.save();
        res.json({ message: 'Recurso saved', newRecurso })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.messag })
    }
};

const getOneRecurso = async (req, res) => {
    try {
        // const id = req.params.id
        // await Product.findById(id, (err, product) => {
        //     res.status(200).json({
        //         status: 'success',
        //         product
        //     })
        // });

        const id = req.params.id
        const recurso = await Recurso.findById(id)
        if (!recurso) return res.sendStatus(404)
        return res.json({ recurso })
    } catch (error) {
        return res.status(500).json({ message: error.messag })
    }
}

const updateRecurso = async (req, res) => {
    try {
        const { nombre, precio, descripcion, cantidad, medida, stock} = req.body;
        const id = { _id: req.params.id };
        await Recurso.findOneAndUpdate(id, {
            nombre,
            precio,
            descripcion,
            cantidad,
            medida,
            stock
        })
        res.json({ message: 'recurso updated' })
    } catch (error) {
        // throw res.status(500)
        return res.status(500).json({ message: error.messag })
    }
}

const updateRecursoState = async (req, res) => {
    try {
        const { estado } = req.body;
        const id = { _id: req.params.id };
        await Recurso.findOneAndUpdate(id, {
            estado,
        })
        res.send()
    } catch (error) {
        console.log("🚀 ~ file: RecursoController.js ~ line 105 ~ updateRecursoState ~ error:", error)
        throw error
        // return res.sendStatus(500).json({ message: error.messag })
    }
}

const deleteRecurso = async (req, res) => {
    try {
        const id = req.params.id
        await Recurso.findByIdAndDelete(id)
        console.log(`recurso con id: ${id} eliminada`)


        res.json({ message: 'recurso deleted' })
    } catch (error) {
        return res.status(500).json({ message: error.messag })
    }

}

module.exports = {
    getRecurso,
    createRecurso,
    getOneRecurso,
    updateRecurso,
    updateRecursoState,
    deleteRecurso,
};