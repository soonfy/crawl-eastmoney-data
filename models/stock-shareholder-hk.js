const mongoose = require('mongoose')

const { Schema } = mongoose
const schema = new Schema({
  code: String,
  wind_code: String,
  inner_code: String,
  name: String,
  date: String,
  time: Date,
  holder: Number,
  asset: Number,
  ratio: Number,
  close_price: Number,
  yield: Number,
  create_time: Date,
})

/**
 * code+date
 */

const table = 'stock_hk_shareholders'
const MODEL = table.toUpperCase()
const model = mongoose.model(MODEL, schema, table)
module.exports = model
