const mongoose = require('mongoose')

const { Schema } = mongoose
const schema = new Schema({
  code: String,
  wind_code: String,
  name: String,
  date: String,
  time: Date,
  financing_lending_sum: Number,
  financing_lending_diff: Number,
  financing_asset: Number,
  financing_asset_ratio: Number,
  financing_in_asset: Number,
  financing_in_asset_3: Number,
  financing_in_asset_5: Number,
  financing_in_asset_10: Number,
  financing_out_asset: Number,
  financing_out_asset_3: Number,
  financing_out_asset_5: Number,
  financing_out_asset_10: Number,
  financing_net_asset: Number,
  financing_net_asset_3: Number,
  financing_net_asset_5: Number,
  financing_net_asset_10: Number,
  lending_num: Number,
  lending_asset: Number,
  lending_in_num: Number,
  lending_in_num_3: Number,
  lending_in_num_5: Number,
  lending_in_num_10: Number,
  lending_out_num: Number,
  lending_out_num_3: Number,
  lending_out_num_5: Number,
  lending_out_num_10: Number,
  lending_net_num: Number,
  lending_net_num_3: Number,
  lending_net_num_5: Number,
  lending_net_num_10: Number,
  close_price: Number,
  yield: Number,
  market_code: String,
  market: String,
  create_time: Date,
})

/**
 * code+date
 */

const table = 'stock_margin_trades'
const MODEL = table.toUpperCase()
const model = mongoose.model(MODEL, schema, table)
module.exports = model
