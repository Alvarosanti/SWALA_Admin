const express = require('express')
const app = express()


let data = [
    {
        "id": 1,
        "name": "bob",
        "lastname": "sponge"
    },
    {
        "id": 2,
        "name": "Calamardo",
        "lastname": "Tentacles"
    }
]

app.get('/', (request, response) => {
    response.end(JSON.stringify(data))
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})