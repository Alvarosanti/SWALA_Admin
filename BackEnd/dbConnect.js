const mongoose = require('mongoose');

mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true

    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err))
