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

class SupplierSerializer extends Serializer {
    constructor(contentType) {
        super()
        this.contentType = contentType
    }
}

module.exports = {
    Serializer: Serializer,
    SupplierSerializer: SupplierSerializer,
    acceptedFormats: ['application/json']
}