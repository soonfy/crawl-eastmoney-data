const { marginTradeQueue } = require('../queues/create-queue')

const { join } = require('path')
const xlsx = require('node-xlsx')

const run = async () => {
  try {
    const file = join(__dirname, '../files/stock-list.xlsx')
    let { data } = xlsx.parse(file)[0]
    console.log(data)
    data = data.slice(1, 2)
    for (const item of data) {
      await marginTradeQueue.add({
        code: item[0],
        name: item[1],
      })
    }
    console.log('marginTradeQueue add', data.length)
  } catch (error) {
    console.log(error)
  }
  process.exit()
}

if (require.main === module) {
  setTimeout(run, 3000)
}
