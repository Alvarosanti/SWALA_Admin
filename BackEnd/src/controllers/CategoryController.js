const Category = require('../models/Category')

const getAllCategory = async (req, res) => {
    try {
        const category = await Category.find();
        res.json({ category })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.messag })
    }
}

module.exports = {
    getAllCategory,
};