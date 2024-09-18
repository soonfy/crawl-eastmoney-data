const cluster = require('cluster')

const { sleep } = require('../utils')

const { shareholderQueue } = require('./create-queue')
const { getStockShareholder } = require('../crawlers/crawl-stock-shareholder')
const { removeAndInsertData, insertData } = require('../databases/save-stock-shareholder')

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
  shareholderQueue.process(async ({ data }) => {
    console.log(data)
    const { code } = data
    let count = 1
    let page = 1
    while (page <= count) {
      console.log('page', page)
      const result = await getStockShareholder(code, {
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
