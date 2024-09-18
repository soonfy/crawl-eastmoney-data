const mongoose = require('mongoose')

const { Schema } = mongoose
const schema = new Schema({
  code: String,
  wind_code: String,
  inner_code: String,
  name: String,
  date: String,
  time: Date,
  ratio: Number,
  type_code: String,
  type: String,
  super_buy: Number,
  super_sell: Number,
  big_buy: Number,
  big_sell: Number,
  net_buy: Number,
  super_ratio: Number,
  big_ratio: Number,
  average_cost: Number,
  average_cost_20: Number,
  average_cost_60: Number,
  closePrice: Number,
  yield: Number,
  turnover: Number,
  dynamic_pe: Number,
  create_time: Date,
})

/**
 * code+date
 */

const table = 'stock_institutions'
const MODEL = table.toUpperCase()
const model = mongoose.model(MODEL, schema, table)
module.exports = model
