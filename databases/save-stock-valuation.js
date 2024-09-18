const { StockValuation, StockValuationOrigin } = require('../models')

/**
 * 删除再插入数据
 * @param {*} data 
 * @param {*} query 
 */
const removeAndInsertData = async (data, query) => {
  if (query) {
    await StockValuation.deleteMany(query)
  }
  const resp = await StockValuation.insertMany(data)
  console.log(`StockValuation saved ${resp.length} data`)
}

/**
 * 直接插入原始数据
 * @param {*} data 
 */
const insertData = async (data) => {
  const bulk = StockValuationOrigin.collection.initializeUnorderedBulkOp()
  
  data.forEach(item => {
    bulk.insert(item)
  })
  console.log(`StockValuationOrigin saved ${data.length} data`)
  await bulk.execute()
}

exports.removeAndInsertData = removeAndInsertData
exports.insertData = insertData
