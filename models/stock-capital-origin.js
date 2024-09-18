const mongoose = require('mongoose')

const { Schema } = mongoose
const schema = new Schema({})

const table = 'origin_stock_capitals'
const MODEL = table.toUpperCase()
const model = mongoose.model(MODEL, schema, table)
module.exports = model
