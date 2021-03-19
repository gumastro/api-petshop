class DataNotProvided extends Error {
    constructor() {
        super('[ERROR] Data not provided')
        this.name = 'DataNotProvided'
        this.idError = 2
    }
}

module.exports = DataNotProvided