require('dotenv').config()

//app req
const app = require('./app')

//env port
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)

})