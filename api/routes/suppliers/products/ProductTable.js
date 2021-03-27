const Model = require('./ProductTableModel')
const instance = require('../../../database')
const NotFound = require('../../../errors/NotFound')

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
            throw new NotFound('Product')
        }

        return found
    },
    update(productData, dataToUpdate) {
        return Model.update(
            dataToUpdate,
            {
                where: productData,
            }
        )
    },
    subtract(idProduct, idSupplier, field, amount) {
        return instance.transaction(async deal => {
            const product = await Model.findOne({
                where: {
                    id: idProduct,
                    supplier: idSupplier
                }
            })

            product[field] = amount

            await product.save()

            return product
        })
    }
}