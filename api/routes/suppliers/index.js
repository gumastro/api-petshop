const router = require('express').Router()
const SupplierTable = require('./SupplierTable')
const Supplier = require('./Supplier')
const { response } = require('express')

router.get('/', async (request, response) => {
    const results = await SupplierTable.list()

    response.send(
        JSON.stringify(results)
    )
})

router.post('/', async (request, response) => {
    const receivedData = request.body
    const supplier = new Supplier(receivedData)
    await supplier.create()

    response.send(
        JSON.stringify(supplier)
    )
})

router.get('/:idSupplier', async (request, response) => {
    try {
        const id = request.params.idSupplier
        const supplier = new Supplier({ id: id })
        
        await supplier.load()

        response.send(
            JSON.stringify(supplier)
        )
    } catch (error) {
        response.send(
            JSON.stringify({
                message: error.message
            })
        )
    }
})

router.put('/:idSupplier', async (request, response) => {
    try {
        const id = request.params.idSupplier
        const receivedData = request.body
        const data = Object.assign({}, receivedData, { id: id })
        const supplier = new Supplier(data)
        console.log(supplier)

        await supplier.update()
    
        response.end()
    } catch (error) {
        response.send(
            JSON.stringify({
                message: error.message
            })
        )
    }
})

router.delete('/:idSupplier', async (request, response) => {
    try {
        const id = request.params.idSupplier
        const supplier = new Supplier({ id: id })

        await supplier.load()
        await supplier.delete()

        response.end()
    } catch (error) {
        response.send(
            JSON.stringify({
                message: error.message
            })
        )
    }
})

module.exports = router