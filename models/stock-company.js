const mongoose = require('mongoose')

const { Schema } = mongoose
const schema = new Schema({
  code: String,
  wind_code: String,
  name: String,
  company_id: String,
  company_code: String,
  company_name: String,
  company_name_en: String,
  former_name: String,
  code_a: String,
  code_name_a: String,
  code_b: String,
  code_name_b: String,
  code_h: String,
  code_name_h: String,
  stock_type: String,
  stock_market: String,
  board_name_inner: String,
  board_name: String,
  president: String,
  legal: String,
  secretary: String,
  chairman: String,
  secpresent: String,
  indedirectors: String,
  telephone: String,
  email: String,
  fax: String,
  web: String,
  address: String,
  postcode: String,
  province: String,
  capital: Number,
  worker: Number,
  manager: Number,
  law_firm: String,
  accounting_firm: String,
  resume: String,
  scope: String,
  create_time: Date,
})

/**
 * code+date
 */

const table = 'stock_companies'
const MODEL = table.toUpperCase()
const model = mongoose.model(MODEL, schema, table)
module.exports = model
