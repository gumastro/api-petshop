const router = require('express').Router()
const SupplierTable = require('./SupplierTable')
const Supplier = require('./Supplier')
const SupplierSerializer = require('../../Serializer').SupplierSerializer

router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204).end()
})

router.get('/', async (req, res) => {
    const results = await SupplierTable.list()

    const serializer = new SupplierSerializer(
        res.getHeader('Content-Type'),
        ['company']
    )

    res.status(200).send(
        serializer.serialize(results)
    )
})

router.post('/', async (req, res, next) => {
    try {
        const receivedData = req.body
        const supplier = new Supplier(receivedData)
        await supplier.create()

        const serializer = new SupplierSerializer(
            res.getHeader('Content-Type'),
            ['company']
        )

        res.status(201).send(
            serializer.serialize(supplier)
        )
    } catch(err) {
        next(err)
    }
})

router.options('/:idSupplier', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204).end()
})

router.get('/:idSupplier', async (req, res, next) => {
    try {
        const id = req.params.idSupplier
        const supplier = new Supplier({ id: id })
        
        await supplier.load()

        const serializer = new SupplierSerializer(
            res.getHeader('Content-Type'),
            ['email', 'company', 'createdAt', 'updatedAt', 'version']
        )

        res.status(200).send(
            serializer.serialize(supplier)
        )
    } catch (err) {
        next(err)
    }
})

router.put('/:idSupplier', async (req, res, next) => {
    try {
        const id = req.params.idSupplier
        const receivedData = req.body
        const data = Object.assign({}, receivedData, { id: id })
        const supplier = new Supplier(data)

        await supplier.update()
    
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

router.delete('/:idSupplier', async (req, res, next) => {
    try {
        const id = req.params.idSupplier
        const supplier = new Supplier({ id: id })

        await supplier.load()
        await supplier.delete()

        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

const productsRouter = require('./products')

const verifySupplier = async (req, res, next) => {
    try {
        const id = req.params.idSupplier
        const supplier = new Supplier({ id: id })
        await supplier.load()
        req.supplier = supplier
        
        next()
    } catch (err) {
        next(err)
    }
}

router.use('/:idSupplier/products', verifySupplier, productsRouter)

module.exports = router