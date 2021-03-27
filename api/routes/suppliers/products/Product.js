const DataNotProvided = require('../../../errors/DataNotProvided')
const InvalidField = require('../../../errors/InvalidField')
const ProductTable = require('./ProductTable')

class Product {
    constructor ({ id, title, price, inventory, supplier, createdAt, updatedAt, version }) {
        this.id = id
        this.title = title
        this.price = price
        this.inventory = inventory
        this.supplier = supplier
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.version = version
    }

    validate () {
        if (typeof this.title !== 'string' || this.title.length === 0) {
            throw new InvalidField('title')
        }
        
        if (typeof this.price !== 'number' || this.price === 0) {
            throw new InvalidField('price')
        }
    }

    async create () {
        this.validate()
        const result = await ProductTable.add({
            title: this.title,
            price: this.price,
            inventory: this.inventory,
            supplier: this.supplier
        })

        this.id = result.id
        this.createdAt = result.createdAt
        this.updatedAt = result.updatedAt
        this.version = result.version
    }

    delete () {
        return ProductTable.delete(this.id, this.supplier)
    }

    async load() {
        const product = await ProductTable.findById(this.id, this.supplier)
        this.title = product.title
        this.price = product.price
        this.inventory = product.inventory
        this.createdAt = product.createdAt
        this.updatedAt = product.updatedAt
        this.version = product.version
    }

    update() {
        
        const dataToUpdate = {}

        if (typeof this.title === 'string' && this.title.length > 0) {
            dataToUpdate.title = this.title
        }
        if (typeof this.price === 'number' && this.price > 0) {
            dataToUpdate.price = this.price
        }
        if (typeof this.inventory === 'number' && this.inventory >= 0) {
            dataToUpdate.inventory = this.inventory
        }

        if (Object.keys(dataToUpdate).length === 0) {
            throw new DataNotProvided()
        }

        return ProductTable.update(
            {
                id: this.id,
                supplier: this.supplier
            },
            dataToUpdate
        )
    }

    subtractInventory () {
        return ProductTable.subtract(
            this.id,
            this.supplier,
            'inventory',
            this.inventory
        )
    }
}

module.exports = Product