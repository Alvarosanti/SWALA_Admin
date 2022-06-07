const Product = require('../models/Product')


const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products)
}

const createProduct = async (req, res) => {
    const { producto_id, nombre, precio, descripcion, contenido, imagen, categoria, check, sold } = req.body;
    const newProduct = new Product();
    newProduct.producto_id = producto_id;
    newProduct.nombre = nombre;
    newProduct.precio = precio;
    newProduct.descripcion = descripcion;
    newProduct.contenido = contenido;
    newProduct.imagen = imagen;
    newProduct.categoria = categoria;
    newProduct.check = check;
    newProduct.sold = sold;

    await newProduct.save();

    res.json({ message: 'Product saved' })
};

const getOneProduct = async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id)
    res.json(product)
}

const updateProduct = async (req, res) => {
    const { producto_id, nombre, precio, descripcion, contenido, imagen, categoria, check, sold } = req.body;
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
        sold
    })
    res.json({ message: 'product updated' })
}

const deleteProduct = async (req, res) => {
    const id = req.params.id
    await Product.findByIdAndDelete(id)
    console.log(`producto con id: ${id} eliminada`)
    res.json({ message: 'product deleted' })

}

module.exports = {
    getProducts,
    createProduct,
    getOneProduct,
    updateProduct,
    deleteProduct
};