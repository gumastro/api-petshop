const Model = require('./SupplierTableModel')

module.exports = {
    list() {
        return Model.findAll()
    },
    add(supplier) {
        return Model.create(supplier)
    },
    async findById(id) {
        const found = await Model.findOne({
            where: {
                id: id
            }
        })
        if (!found) {
            throw new Error('[ERROR] Supplier not found!')
        }

        return found
    },
    update(id, dataToUpdate) {
        return Model.update(
            dataToUpdate,
            {
                where: { id: id }
            }
        )
    },
    delete(id) {
        return Model.destroy({
            where: { id: id }
        })
    }
}