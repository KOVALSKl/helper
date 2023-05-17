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

function connectToDB() {
    return new Promise((resolve, reject) => {
        sequelize.authenticate()
            .then(resolve)
            .catch(reject)
        sequelize.sync()
            .then(resolve)
            .catch(reject)
    })
}

const start = () => {
    connectToDB()
        .then(() => {
            app.listen(PORT, () => console.info(`Успешно подклюено, порт:${PORT}`))
        })
        .catch(() => {
            console.error('Не удалось подключиться к серверу')
            setTimeout(start, 2000)
        })
}

start()