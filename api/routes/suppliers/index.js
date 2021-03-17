const router = require('express').Router()
const TableModel = require('./SupplierTableModel')

router.get('/', async (request, response) => {
    const results = await TableModel.findAll()
    response.send(
        JSON.stringify(results)
    )
})

module.exports = router