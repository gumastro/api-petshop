const router = require('express').Router({ mergeParams: true })
const ProductTable = require('./ProductTable')
const Product = require('./Product')
const Serializer = require('../../../Serializer').ProductSerializer

router.get('/', async (req, res) => {
    const products = await ProductTable.list(req.supplier.id)

    const serializer = new Serializer(res.getHeader('Content-Type'))

    res.send(
        serializer.serialize(products)
    )
})

router.post('/', async (req, res, next) => {
    try {
        const idSupplier = req.supplier.id
        const body = req.body
        const data = Object.assign({}, body, { supplier: idSupplier })
        const product = new Product(data)
        await product.create()

        const serializer = new Serializer(res.getHeader('Content-Type'))

        res.set('ETag', product.version)
        const timestamp = (new Date(product.updatedAt)).getTime()
        res.set('Last-Modified', timestamp)
        res.set('Location', `/api/suppliers/${product.supplier}/products/${product.id}`)

        res.status(201).send(
            serializer.serialize(product)
        )
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res) => {
    const data = {
        id: req.params.id,
        supplier: req.supplier.id
    }

    const product = new Product(data)
    await product.delete()

    res.status(204).end()
})

router.get('/:id', async (req, res, next) => {
    try {
        const data = {
            id: req.params.id,
            supplier: req.supplier.id
        }
    
        const product = new Product(data)
        await product.load()

        const serializer = new Serializer(
            res.getHeader('Content-Type'),
            ['price', 'inventory', 'supplier', 'createdAt', 'updatedAt', 'version']
        )
    
        res.set('ETag', product.version)
        const timestamp = (new Date(product.updatedAt)).getTime()
        res.set('Last-Modified', timestamp)

        res.status(200).send(
            serializer.serialize(product)
        )
    } catch (err) {
        next(err)
    }
})

router.head('/:id', async (req, res, next) => {
    try {
        const data = {
            id: req.params.id,
            supplier: req.supplier.id
        }
    
        const product = new Product(data)
        await product.load()

        res.set('ETag', product.version)
        const timestamp = (new Date(product.updatedAt)).getTime()
        res.set('Last-Modified', timestamp)

        res.status(200).end()
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const data = Object.assign(
            {},
            req.body,
            {
                id: req.params.id,
                supplier: req.supplier.id
            }
        )
    
        const product = new Product(data)
        await product.update()
        await product.load()

        res.set('ETag', product.version)
        const timestamp = (new Date(product.updatedAt)).getTime()
        res.set('Last-Modified', timestamp)

        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

router.put('/:id/subtract-inventory', async (req, res, next) => {
    try {
        const product = new Product({
            id: req.params.id,
            supplier: req.supplier.id
        })
    
        await product.load()
        product.inventory = product.inventory - req.body.amount >= 0 ? product.inventory - req.body.amount : 0

        await product.subtractInventory()
        await product.load()

        res.set('ETag', product.version)
        const timestamp = (new Date(product.updatedAt)).getTime()
        res.set('Last-Modified', timestamp)

        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

module.exports = router