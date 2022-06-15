const express = require('express');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload')

require('./dbConnect')

limit = 52428800;
//settings

//middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

//routes
app.use('/api/order', require('./src/routes/OrderRoutes'))
app.use('/api/product', require('./src/routes/ProductRoutes'))
app.use('/api/provider', require('./src/routes/ProviderRoutes'))
app.use('/api/resources', require('./src/routes/ResourceRoutes'))
app.use('/api/user', require('./src/routes/UserRoutes'))
app.use('/api/category', require('./src/routes/CategoryRoutes'))

module.exports = app;