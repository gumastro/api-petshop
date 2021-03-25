const express = require('express')
const config = require('config')
const NotFound = require('./errors/NotFound')
const InvalidField = require('./errors/InvalidField')
const DataNotProvided = require('./errors/DataNotProvided')
const UnsupportedValue = require('./errors/UnsupportedValue')
const acceptedFormats = require('./Serializer').acceptedFormats
const ErrorSerializer = require('./Serializer').ErrorSerializer

const app = express()

app.use(express.json());

app.use((req, res, next) => {
    let requestedFormat = req.header('Accept')

    if(requestedFormat === '*/*') {
        requestedFormat = 'application/json'
    }

    if (acceptedFormats.indexOf(requestedFormat) === -1) {
        res.status(406).end()
        return
    }

    res.setHeader('Content-Type', requestedFormat)
    next()
})

const router = require('./routes/suppliers')
app.use('/api/suppliers', router)

app.use((error, req, res, next) => {
    let status = 500

    if(error instanceof NotFound) {
        status = 404
    }
    if(error instanceof InvalidField || error instanceof DataNotProvided) {
        status = 400
    }
    if(error instanceof UnsupportedValue) {
        status = 406
    }

    const serializer = new ErrorSerializer(
        res.getHeader('Content-Type')
    )
    res.status(status).send(
        serializer.serialize({
            message: error.message,
            id: error.idError
        })
    )
})

app.listen(config.get('api.port'), () => {
    console.log("API is working!")
})