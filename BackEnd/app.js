const express = require('express');
const cors = require('cors');
const app = express();
require('./dbConnect')


//settings

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/order', require('./src/routes/OrderRoutes'))
app.use('/api/product', require('./src/routes/ProductRoutes'))
app.use('/api/provider', require('./src/routes/ProviderRoutes'))
app.use('/api/resources', require('./src/routes/ResourceRoutes'))
app.use('/api/user', require('./src/routes/UserRoutes'))

module.exports = app;