const { StockShareholderHk, StockShareholderHkOrigin } = require('../models')

/**
 * 删除再插入数据
 * @param {*} data 
 * @param {*} query 
 */
const removeAndInsertData = async (data, query) => {
  if (query) {
    await StockShareholderHk.deleteMany(query)
  }
  const resp = await StockShareholderHk.insertMany(data)
  console.log(`StockShareholderHk saved ${resp.length} data`)
}

/**
 * 直接插入原始数据
 * @param {*} data 
 */
const insertData = async (data) => {
  const bulk = StockShareholderHkOrigin.collection.initializeUnorderedBulkOp()
  
  data.forEach(item => {
    bulk.insert(item)
  })
  console.log(`StockShareholderHkOrigin saved ${data.length} data`)
  await bulk.execute()
}

exports.removeAndInsertData = removeAndInsertData
exports.insertData = insertData
