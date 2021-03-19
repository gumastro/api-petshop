class NotFound extends Error {
    constructor() {
        super('[ERROR] Supplier not found!')
        this.name = 'NotFound'
        this.idError = 0
    }
}

module.exports = NotFound