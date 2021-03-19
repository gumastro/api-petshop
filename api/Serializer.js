const UnsupportedValue = require('./errors/UnsupportedValue')

class Serializer {
    json(data) {
        return JSON.stringify(data)
    }

    serialize (data) {
        if(this.contentType === 'application/json') {
            return this.json(data)
        }

        throw new UnsupportedValue(this.contentType)
    }
}

module.exports = {
    Serializer: Serializer,
    acceptedFormats: ['application/json']
}