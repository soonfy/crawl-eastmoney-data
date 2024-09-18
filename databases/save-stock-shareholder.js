const { StockShareholder, StockShareholderOrigin } = require('../models')

/**
 * 删除再插入数据
 * @param {*} data 
 * @param {*} query 
 */
const removeAndInsertData = async (data, query) => {
  if (query) {
    await StockShareholder.deleteMany(query)
  }
  const resp = await StockShareholder.insertMany(data)
  console.log(`StockShareholder saved ${resp.length} data`)
}

/**
 * 直接插入原始数据
 * @param {*} data 
 */
const insertData = async (data) => {
  const bulk = StockShareholderOrigin.collection.initializeUnorderedBulkOp()
  
  data.forEach(item => {
    bulk.insert(item)
  })
  console.log(`StockShareholderOrigin saved ${data.length} data`)
  await bulk.execute()
}

exports.removeAndInsertData = removeAndInsertData
exports.insertData = insertData
