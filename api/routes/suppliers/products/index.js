const router = require('express').Router()

router.get('/', (req, res) => {
    res.send(
        JSON.stringify([])
    )
})

module.exports = router