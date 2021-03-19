class UnsupportedValue extends Error {
    constructor(contentType) {
        super(`[ERROR] Unsupported value: ${contentType}`)
        this.name = 'UnsupportedValue'
        this.idError = 3
    }
}

module.exports = UnsupportedValue