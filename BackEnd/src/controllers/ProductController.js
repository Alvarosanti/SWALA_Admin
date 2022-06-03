


const getProducts = (req, res) => {
    res.json({ message: [] })
}

const createProduct = (req, res) => {
    res.json({ message: 'Product saved' })
}

const getOneProduct = (req, res) => {
    res.json({ message: 'one product' })
}

const updateProduct = (req, res) => {
    res.json({ message: 'product updated' })
}

const deleteProduct = (req, res) => {
    res.json({ message: 'product deleted' })
}

module.exports = {
    getProducts,
    createProduct,
    getOneProduct,
    updateProduct,
    deleteProduct
};