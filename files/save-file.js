const fs = require('fs')
const xlsx = require('node-xlsx')

const writeXlsx = (file, data) => fs.writeFileSync(file, xlsx.build(data))

exports.writeXlsx = writeXlsx
