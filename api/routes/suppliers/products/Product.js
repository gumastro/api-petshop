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

    async create () {
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
}

module.exports = Product