const mongoose = require('mongoose')

const { Schema } = mongoose
const schema = new Schema({
  code: String,
  wind_code: String,
  name: String,
  date: String,
  time: Date,
  change_person: String,
  change_holder: Number,
  change_reason: String,
  change_ratio: Number,
  holder: Number,
  holder_type: String,
  manager_name: String,
  manager_position: String,
  relation: String,
  create_time: Date,
})

/**
 * code+date
 */

const table = 'stock_managers'
const MODEL = table.toUpperCase()
const model = mongoose.model(MODEL, schema, table)
module.exports = model
