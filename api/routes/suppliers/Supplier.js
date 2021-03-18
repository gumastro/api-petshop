const SupplierTable = require('./SupplierTable')

class Supplier {
    constructor({ id, company, email, category, createdAt, updatedAt, version }) {
        this.id = id
        this.company = company
        this.email = email
        this.category = category
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.version = version
    }

    async create() {
        const result = await SupplierTable.add({
            company: this.company,
            email: this.email,
            category: this.category
        })

        this.id = result.id
        this.createdAt = result.createdAt
        this.updatedAt = result.updatedAt
        this.version = result.version
    }

    async load() {
        const foundSupplier = await SupplierTable.findById(this.id)

        this.company = foundSupplier.company
        this.email = foundSupplier.email
        this.category = foundSupplier.category
        this.createdAt = foundSupplier.createdAt
        this.updatedAt = foundSupplier.updatedAt
        this.version = foundSupplier.version

    }
}

module.exports = Supplier