require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/route');
const ErrorHandlingMiddleware = require('./middlewares/ErrorHandlingMiddleware');

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(ErrorHandlingMiddleware)


const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`successfully started on PORT:${PORT}`))
    } catch (e) {
        console.log('Unexpected error')
    }
}

start()