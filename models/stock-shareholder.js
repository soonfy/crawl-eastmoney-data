const mongoose = require('mongoose')

const { Schema } = mongoose
const schema = new Schema({
  code: String,
  name: String,
  date: String,
  time: Date,
  publish_date: String,
  holder: Number,
  pre_holder: Number,
  pre_holder_date: String,
  holder_change_ratio: Number,
  total_share: Number,
  total_asset: Number,
  average_holder_share: Number,
  average_holder_asset: Number,
  change_share: Number,
  change_reason: String,
  yield: Number,
  create_time: Date,
})

/**
 * code+date
 */

const table = 'stock_shareholders'
const MODEL = table.toUpperCase()
const model = mongoose.model(MODEL, schema, table)
module.exports = model
