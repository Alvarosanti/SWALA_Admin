


const getOC = (req, res) => {
    res.json({ message: [] })
}

const createOC = (req, res) => {
    res.json({ message: 'user saved' })
}

const getOneOC = (req, res) => {
    res.json({ message: 'one user' })
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