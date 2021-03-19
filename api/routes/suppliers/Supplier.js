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
        this.validate()
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

    async update() {
        await SupplierTable.findById(this.id)
        const fields = ['company', 'email', 'category']
        const dataToUpdate = {}

        fields.forEach((field) => {
            const value = this[field]
            if(typeof value === 'string' && value.length > 0) {
                dataToUpdate[field] = value
            }
        })

        if(Object.keys(dataToUpdate).length === 0) {
            throw new Error ('[ERROR] Unable to update due to lack of data')
        }

        await SupplierTable.update(this.id, dataToUpdate)
    }

    delete() {
        return SupplierTable.delete(this.id)
    }

    validate() {
        const fields = ['company', 'email', 'category']

        fields.forEach(field => {
            const value = this[field]

            if (typeof value !== 'string' || value.length === 0) {
                throw new Error(`[ERROR] Invalid '${field}' field`)
            }
        })
    }
}

module.exports = Supplier