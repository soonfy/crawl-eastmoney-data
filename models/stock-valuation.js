const mongoose = require('mongoose')

const { Schema } = mongoose
const schema = new Schema({
  code: String,
  wind_code: String,
  name: String,
  date: String,
  time: Date,
  total_asset: Number,
  outstanding_asset: Number,
  total_share: Number,
  outstanding_share: Number,
  static_pe: Number,
  dynamic_pe: Number,
  dynamic_pb: Number,
  static_pcf: Number,
  dynamic_pcf: Number,
  dynamic_ps: Number,
  dynamic_peg: Number,
  close_price: Number,
  yield: Number,
  board_code: String,
  board_name: String,
  create_time: Date,
})

/**
 * code+date
 */

const table = 'stock_valuations'
const MODEL = table.toUpperCase()
const model = mongoose.model(MODEL, schema, table)
module.exports = model
