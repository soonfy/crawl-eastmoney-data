const Queue = require('bull')
const { redisConfig } = require('../config')

const createQueue = (id) => {
  const queue = Queue(id, { redis: redisConfig })
  queue
    .on('stalled', (job) => {
      console.log(`${id} is stalled`, new Date())
      job.remove()
    })
    .on('error', (error) => {
      console.log(`${id} got error`, error, new Date())
    })
    .on('completed', (job) => {
      console.log(`${id} complete job`, job.data.name, new Date())
      job.remove()
    })
    .on('failed', (job, err) => {
      console.log(`${id} fail job ${job.data.name}`, err, new Date())
      job.remove()
    })
  return queue
}

exports.createQueue = createQueue
exports.institutionQueue = createQueue('stock-institution')
exports.shareholderQueue = createQueue('stock-shareholder')
exports.hkShareholderQueue = createQueue('stock-hk-shareholder')
exports.marginTradeQueue = createQueue('stock-margin-trade')
exports.managerQueue = createQueue('stock-manager')
exports.valuationQueue = createQueue('stock-valuation')
exports.capitalQueue = createQueue('stock-capital')
exports.companyQueue = createQueue('stock-company')
