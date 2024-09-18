const { StockCapital, StockCapitalOrigin } = require('../models')

/**
 * 删除再插入数据
 * @param {*} data 
 * @param {*} query 
 */
const removeAndInsertData = async (data, query) => {
  if (query) {
    await StockCapital.deleteMany(query)
  }
  const resp = await StockCapital.insertMany(data)
  console.log(`StockCapital saved ${resp.length} data`)
}

/**
 * 直接插入原始数据
 * @param {*} data 
 */
const insertData = async (data) => {
  const bulk = StockCapitalOrigin.collection.initializeUnorderedBulkOp()
  
  data.forEach(item => {
    bulk.insert(item)
  })
  console.log(`StockCapitalOrigin saved ${data.length} data`)
  await bulk.execute()
}

exports.removeAndInsertData = removeAndInsertData
exports.insertData = insertData
