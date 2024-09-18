const mongoose = require('mongoose')

const { Schema } = mongoose
const schema = new Schema({
  code: String,
  name: String,
  date: String,
  time: Date,
  main_in_capital: Number,
  small_in_capital: Number,
  middle_in_capital: Number,
  big_in_capital: Number,
  super_in_capital: Number,
  main_in_capital_ratio: Number,
  small_in_capital_ratio: Number,
  middle_in_capital_ratio: Number,
  big_in_capital_ratio: Number,
  super_in_capital_ratio: Number,
  close_price: Number,
  yield: Number,
  create_time: Date,
})

/**
 * code+date
 */

const table = 'stock_capitals'
const MODEL = table.toUpperCase()
const model = mongoose.model(MODEL, schema, table)
module.exports = model
