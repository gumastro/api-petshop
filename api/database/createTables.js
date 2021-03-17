const TableModel = require('../routes/suppliers/SupplierTableModel')

TableModel
    .sync()
    .then(() => console.log('[SUCCESS] Table created'))
    .catch(console.log)