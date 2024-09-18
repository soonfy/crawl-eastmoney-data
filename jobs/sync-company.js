const { companyQueue } = require('../queues/create-queue')

const { join } = require('path')
const xlsx = require('node-xlsx')

const run = async () => {
  try {
    // const file = join(__dirname, '../files/stock-list.xlsx')
    // let { data } = xlsx.parse(file)[0]
    // console.log(data)
    // data = data.slice(1, 2)
    // for (const item of data) {
    //   await capitalQueue.add({
    //     code: item[0],
    //     name: item[1],
    //   })
    // }
    await companyQueue.add({
      code: 'SZ300124',
      name: '汇川技术',
    })
    // console.log('companyQueue add', data.length)
  } catch (error) {
    console.log(error)
  }
  process.exit()
}

if (require.main === module) {
  setTimeout(run, 3000)
}
