const { StockManager, StockManagerOrigin } = require('../models')

/**
 * 删除再插入数据
 * @param {*} data 
 * @param {*} query 
 */
const removeAndInsertData = async (data, query) => {
  if (query) {
    await StockManager.deleteMany(query)
  }
  const resp = await StockManager.insertMany(data)
  console.log(`StockManager saved ${resp.length} data`)
}

/**
 * 直接插入原始数据
 * @param {*} data 
 */
const insertData = async (data) => {
  const bulk = StockManagerOrigin.collection.initializeUnorderedBulkOp()
  
  data.forEach(item => {
    bulk.insert(item)
  })
  console.log(`StockManagerOrigin saved ${data.length} data`)
  await bulk.execute()
}

exports.removeAndInsertData = removeAndInsertData
exports.insertData = insertData
