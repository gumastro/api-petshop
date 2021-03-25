const Model = require('./ProductTableModel')

module.exports = {
    list (idSupplier) {
        return Model.findAll({
            where: {
                supplier: idSupplier
            }
        })
    },
    add (data) {
        return Model.create(data)
    }
}