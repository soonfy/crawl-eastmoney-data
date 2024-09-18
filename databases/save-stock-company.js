const { StockCompany, StockCompanyOrigin, StockCompanyIssue, StockCompanyIssueOrigin } = require('../models')

/**
 * 删除再插入数据
 * @param {*} data 
 * @param {*} query 
 */
const removeAndInsertData = async (data, query) => {
  if (query) {
    await StockCompany.deleteMany(query)
  }
  const resp = await StockCompany.insertMany(data)
  console.log(`StockCompany saved ${resp.length} data`)
}

/**
 * 直接插入原始数据
 * @param {*} data 
 */
const insertData = async (data) => {
  const bulk = StockCompanyOrigin.collection.initializeUnorderedBulkOp()
  
  data.forEach(item => {
    bulk.insert(item)
  })
  console.log(`StockCompanyOrigin saved ${data.length} data`)
  await bulk.execute()
}

/**
 * 删除再插入数据
 * @param {*} data 
 * @param {*} query 
 */
const removeAndInsertIssue = async (data, query) => {
  if (query) {
    await StockCompanyIssue.deleteMany(query)
  }
  const resp = await StockCompanyIssue.insertMany(data)
  console.log(`StockCompanyIssue saved ${resp.length} data`)
}

/**
 * 直接插入原始数据
 * @param {*} data 
 */
const insertIssue = async (data) => {
  const bulk = StockCompanyIssueOrigin.collection.initializeUnorderedBulkOp()
  
  data.forEach(item => {
    bulk.insert(item)
  })
  console.log(`StockCompanyIssueOrigin saved ${data.length} data`)
  await bulk.execute()
}

exports.removeAndInsertData = removeAndInsertData
exports.insertData = insertData
exports.removeAndInsertIssue = removeAndInsertIssue
exports.insertIssue = insertIssue
