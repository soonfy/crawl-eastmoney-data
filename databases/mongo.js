const mongoose = require('mongoose')

const { mongodbConfig } = require('../config')

mongoose.connect(mongodbConfig.url)

console.log(mongodbConfig)

module.exports = mongoose
