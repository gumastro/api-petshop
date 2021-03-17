const express = require('express')
const config = require('config')

const app = express()

app.use(express.json());

const router = require('./routes/suppliers')
app.use('/api/suppliers', router)


app.listen(config.get('api.port'), () => {
    console.log("API is working!")
})