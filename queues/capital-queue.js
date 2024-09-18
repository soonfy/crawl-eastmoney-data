const cluster = require('cluster')

const { sleep } = require('../utils')

const { capitalQueue } = require('./create-queue')
const { getStockCapital } = require('../crawlers/crawl-stock-capital')
const { removeAndInsertData, insertData } = require('../databases/save-stock-capital')

const os = require('os')
const cpus = os.cpus()
const numWorkers = cpus.length

if (cluster.isMaster) {
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork()
    console.log(`Worker [${i + 1}] started.`)
  }

  cluster.on('exit', function (worker) {
    console.log('worker ' + worker.process.pid + ' died')
  })
} else {
  capitalQueue.process(async ({ data }) => {
    console.log(data)
    const { code } = data
    let result = null
    while (!result) {
      result = await getStockCapital(code)
      await sleep(Math.random() * 5000)
    }
    if (result.data && result.data.length) {
      // console.log(result.cameldata)
      await insertData(result.data)
      const dates = result.cameldata.map(item => item.date)
      const query = { code, date: { $in: dates } }
      await removeAndInsertData(result.cameldata, query)
    }
  })
}
