const Model = require('./SupplierTableModel')
const NotFound = require('../../errors/NotFound')

module.exports = {
    list() {
        return Model.findAll({ raw: true })
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
            throw new NotFound()
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