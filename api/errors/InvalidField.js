class InvalidField extends Error {
    constructor(field) {
        const message = `[ERROR] Invalid field: '${field}'`
        super(message)
        this.name = 'InvalidField'
        this.idError = 1
    }
}

module.exports = InvalidField