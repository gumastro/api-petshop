const jsontoxml = require('jsontoxml')
const UnsupportedValue = require('./errors/UnsupportedValue')

class Serializer {
    json(data) {
        return JSON.stringify(data)
    }

    xml(data) {
        let tag = this.tagSingular

        if(Array.isArray(data)) {
            tag = this.tagPlural
            data = data.map((item) => {
                return {
                    [this.tagSingular]: item
                }
            })
        }
        return jsontoxml({ [tag]: data })
    }

    serialize (data) {
        data = this.filter(data)

        if(this.contentType === 'application/json') {
            return this.json(data)
        }
        if(this.contentType === 'application/xml') {
            return this.xml(data)
        }

        throw new UnsupportedValue(this.contentType)
    }

    filterObject(data) {
        const newObject = {}

        this.publicFields.forEach((field) => {
            if (data.hasOwnProperty(field)) {
                newObject[field] = data[field]
            }
        })

        return newObject
    }

    filter(data) { 
        if(Array.isArray(data)) {
            data = data.map(item => {
                return this.filterObject(item)
            })
        } else {
            data = this.filterObject(data)
        }

        return data
    }
}

class SupplierSerializer extends Serializer {
    constructor(contentType, extraFields) {
        super()
        this.contentType = contentType
        this.publicFields = ['id', 'company', 'category'].concat(extraFields || [])
        this.tagSingular = 'supplier'
        this.tagPlural = 'suppliers'
    }
}

class ErrorSerializer extends Serializer {
    constructor(contentType, extraFields) {
        super()
        this.contentType = contentType
        this.publicFields = ['id', 'message'].concat(extraFields || [])
        this.tagSingular = 'error'
        this.tagPlural = 'errors'
    }
}

class ProductSerializer extends Serializer {
    constructor(contentType, extraFields) {
        super()
        this.contentType = contentType
        this.publicFields = ['id', 'title'].concat(extraFields || [])
        this.tagSingular = 'product'
        this.tagPlural = 'products'
    }
}

module.exports = {
    Serializer: Serializer,
    SupplierSerializer: SupplierSerializer,
    ErrorSerializer: ErrorSerializer,
    ProductSerializer: ProductSerializer,
    acceptedFormats: ['application/json', 'application/xml']
}