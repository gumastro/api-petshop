const Model = require('./ProductTableModel')

module.exports = {
    list (idSupplier) {
        return Model.findAll({
            where: {
                supplier: idSupplier
            },
            raw: true
        })
    },
    add (data) {
        return Model.create(data)
    },
    delete (idProduct, idSupplier) {
        return Model.destroy({
            where: {
                id: idProduct,
                supplier: idSupplier
            }
        })
    },
    async findById(idProduct, idSupplier) {
        const found = await Model.findOne({
            where: {
                id: idProduct,
                supplier: idSupplier
            },
            raw: true
        })

        if (!found) {
            throw new Error('[ERROR] Product not found')
        }

        return found
    }
}