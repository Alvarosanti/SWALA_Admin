const Product = require('../models/Product')
const { uploadImage, deleteImage } = require('../libs/clouldinary')
const fs = require('fs-extra')


const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ products })
    } catch (error) {
        return res.status(500).json({ message: error.messag })
    }
}

const createProduct = async (req, res) => {
    try {
        const { producto_id, nombre, precio, descripcion, contenido, categoria, check, sold } = req.body;
        console.log('req body:', req.body)
        let images;
        console.log('req file:', req.files)
        if (req.files?.images) {
            const result = await uploadImage(req.files.images.tempFilePath)
            console.log('result:', result)
            await fs.remove(req.files.images.tempFilePath)
            images = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }

        const newProduct = new Product({
            producto_id: "006",
            nombre,
            precio,
            descripcion,
            contenido: "contenido",
            categoria,
            check,
            sold,
            estado: "habilitado",
            images
        });
        await newProduct.save();
        res.json({ message: 'Product saved', newProduct })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.messag })
    }
};

const getOneProduct = async (req, res) => {
    try {
        // const id = req.params.id
        // await Product.findById(id, (err, product) => {
        //     res.status(200).json({
        //         status: 'success',
        //         product
        //     })
        // });

        const id = req.params.id
        const product = await Product.findById(id)
        if (!product) return res.sendStatus(404)
        return res.json({ product })
    } catch (error) {
        return res.status(500).json({ message: error.messag })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { producto_id, nombre, precio, descripcion, contenido, imagen, categoria, check, sold, estado } = req.body;
        const id = { _id: req.params.id };
        await Product.findOneAndUpdate(id, {
            producto_id,
            nombre,
            precio,
            descripcion,
            contenido,
            imagen,
            categoria,
            check,
            sold,
            estado,
        })
        res.send()
        res.json({ message: 'product updated' })
    } catch (error) {
        return res.status(500).json({ message: error.messag })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        await Product.findByIdAndDelete(id)
        console.log(`producto con id: ${id} eliminada`)


        res.json({ message: 'product deleted' })
    } catch (error) {
        return res.status(500).json({ message: error.messag })
    }

}

//eliminar img del cloudinary
const deleteImages = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        if (!product) return res.sendStatus(404)
        if (product.images) {
            await deleteImage(product.images.public_id)
        }
        return res.json({ product })
    } catch (error) {
        return res.status(500).json({ message: error.messag })
    }
}

module.exports = {
    getProducts,
    createProduct,
    getOneProduct,
    updateProduct,
    deleteProduct,
    deleteImages
};