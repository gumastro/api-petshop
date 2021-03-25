const router = require('express').Router({ mergeParams: true })
const Table = require('./ProductTable')

router.get('/', async (req, res) => {
    const products = await Table.list(req.params.idSupplier)
    res.send(
        JSON.stringify(products)
    )
})

module.exports = router