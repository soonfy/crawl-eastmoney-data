const cluster = require('cluster')

const { sleep } = require('../utils')

const { managerQueue } = require('./create-queue')
const { getStockManager } = require('../crawlers/crawl-stock-manager')
const { removeAndInsertData, insertData } = require('../databases/save-stock-manager')

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
  managerQueue.process(async ({ data }) => {
    console.log(data)
    const { code } = data
    let count = 1
    let page = 1
    while (page <= count) {
      console.log('page', page)
      const result = await getStockManager(code, {
        page,
      })
      if (result) {
        // console.log(result.cameldata)
        await insertData(result.data)
        const dates = result.cameldata.map(item => item.date)
        const query = { code, date: { $in: dates } }
        await removeAndInsertData(result.cameldata, query)
        page += 1
        count = result.pages
      }
      if (result === null) {
        page += 1
      }
      await sleep(Math.random() * 5000)
    }
  })
}
