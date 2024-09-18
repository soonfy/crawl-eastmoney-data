const cluster = require('cluster')

const { sleep } = require('../utils')

const { companyQueue } = require('./create-queue')
const { getStockCompany } = require('../crawlers/crawl-stock-company')
const { removeAndInsertData, insertData, removeAndInsertIssue, insertIssue } = require('../databases/save-stock-company')

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
  companyQueue.process(async ({ data }) => {
    console.log(data)
    const { code } = data
    let result = null
    while (!result) {
      result = await getStockCompany(code)
      await sleep(Math.random() * 5000)
    }
    if (result.company && result.company.length) {
      // console.log(result.cameldata)
      await insertData(result.company)
      const query = { code }
      await removeAndInsertData(result.camelCompany, query)
    }
    if (result.issue && result.issue.length) {
      // console.log(result.cameldata)
      await insertIssue(result.issue)
      const query = { code }
      await removeAndInsertIssue(result.camelIssue, query)
    }
  })
}
