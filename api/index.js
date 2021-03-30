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

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    next()
})

const router = require('./routes/suppliers')
app.use('/api/suppliers', router)

const routerV2 = require('./routes/suppliers/routes.v2')
app.use('/api/v2/suppliers', routerV2)

app.use((err, req, res, next) => {
    let status = 500

    if(err instanceof NotFound) {
        status = 404
    }
    if(err instanceof InvalidField || err instanceof DataNotProvided) {
        status = 400
    }
    if(err instanceof UnsupportedValue) {
        status = 406
    }

    const serializer = new ErrorSerializer(
        res.getHeader('Content-Type')
    )
    res.status(status).send(
        serializer.serialize({
            message: err.message,
            id: err.idError
        })
    )
})

app.listen(config.get('api.port'), () => {
    console.log("API is working!")
})