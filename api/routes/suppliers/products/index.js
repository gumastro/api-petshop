const router = require('express').Router({ mergeParams: true })
const Table = require('./ProductTable')
const Product = require('./Product')

router.get('/', async (req, res) => {
    const products = await Table.list(req.params.idSupplier)
    res.send(
        JSON.stringify(products)
    )
})

router.post('/', async (req, res) => {
    const idSupplier = req.params.idSupplier
    const body = req.body
    const data = Object.assign({}, body, { supplier: idSupplier })
    const product = new Product(data)
    await product.create()

    res.status(201).send(
        JSON.stringify(product)
    )
})

module.exports = router