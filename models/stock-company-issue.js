const mongoose = require('mongoose')

const { Schema } = mongoose
const schema = new Schema({
  code: String,
  wind_code: String,
  found_date: Date,
  issue_date: Date,
  issue_pe: Number,
  issue_date_online: Date,
  issue_way: String,
  stock_value: Number,
  total_holder: Number,
  issue_price: Number,
  issue_fee: Number,
  total_asset: Number,
  raise_asset: Number,
  open_price: Number,
  close_price: Number,
  max_price: Number,
  turnover: Number,
  offline_winning_ratio: Number,
  pricing_winning_ratio: Number,
  create_time: Date,
})

/**
 * code+date
 */

const table = 'stock_company_issues'
const MODEL = table.toUpperCase()
const model = mongoose.model(MODEL, schema, table)
module.exports = model
