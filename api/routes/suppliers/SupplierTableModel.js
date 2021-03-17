const Sequelize = require('sequelize')
const instance = require('../../database')

const columns = {
    company: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.ENUM('food', 'toys'),
        allowNull: false
    }
}

const options = {
    freezeTableName: true,
    tableName: 'suppliers',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    version: 'version'
}

module.exports = instance.define('supplier', columns, options)