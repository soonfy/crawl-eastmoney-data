const mongoose = require('mongoose')

const { Schema } = mongoose
const schema = new Schema({
  name: String,
  code: String,
  wind_code: String,
  inner_code: String,
  create_date: Date,
  update_date: Date,
})

const model = mongoose.model('STOCK', schema, 'stocks')
module.exports = model
