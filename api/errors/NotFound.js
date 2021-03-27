class NotFound extends Error {
    constructor(entity) {
        super(`[ERROR] ${entity} not found!`)
        this.name = 'NotFound'
        this.idError = 0
    }
}

module.exports = NotFound