


const getUser = (req, res) => {
    res.json({ message: [] })
}

const createUser = (req, res) => {
    res.json({ message: 'user saved' })
}

const getOneUser = (req, res) => {
    res.json({ message: 'one user' })
}

const updateUser = (req, res) => {
    res.json({ message: 'user updated' })
}

const deleteUser = (req, res) => {
    res.json({ message: 'user deleted' })
}

module.exports = {
    getUser,
    createUser,
    getOneUser,
    updateUser,
    deleteUser
};