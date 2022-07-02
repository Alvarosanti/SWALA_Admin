const Recurso = require('../models/Recurso')

const getRecurso = async (req, res) => {
    try {
        const recurso = await Recurso.find();
        res.json({ recurso })
    } catch (error) {
        return res.status(500).json({ message: error.messag })
    }
}

const getRecursoHabilitado = async (req, res) => {
    try {
        const recurso = await Recurso.find({ estado: 'habilitado' });
        res.json({ recurso })
    } catch (error) {
        return res.status(500).json({ message: error.messag })
    }
}

const getRecursoAlerta = async (req, res) => {
    try {
        const recurso = await Recurso.find({ alerta: true });
        res.json({ recurso })
    } catch (error) {
        return res.status(500).json({ message: error.messag })
    }
}

const updateRecursoAlert = async (req, res) => {
    try {
        const { alerta } = req.body;
        const id = { _id: req.params.id };
        await Recurso.findOneAndUpdate(id, {
            alerta,
        })
        res.send()
    } catch (error) {
        console.log("🚀 ~ file: RecursoController.js ~ line 25 ~ createRecursoAlert ~ error", error)
        throw error
    }
}

const createRecurso = async (req, res) => {
    try {
        const { recurso_id, nombre, medida, stock, precio, stockMinimo, descripcion } = req.body;
        const newRecurso = new Recurso({
            recurso_id,
            nombre,
            medida,
            stock,
            precio,
            stockMinimo,
            descripcion,
            estado: "habilitado",
            alerta: false
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
        const { nombre, medida, stock, precio, stockMinimo, descripcion } = req.body;
        const id = { _id: req.params.id };
        await Recurso.findOneAndUpdate(id, {
            nombre,
            medida,
            stock,
            precio,
            stockMinimo,
            descripcion,
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
    getRecursoHabilitado,
    createRecurso,
    getOneRecurso,
    updateRecurso,
    updateRecursoState,
    deleteRecurso,
    updateRecursoAlert,
    getRecursoAlerta,
};