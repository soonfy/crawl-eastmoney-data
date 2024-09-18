const modelMap = require('../models')
console.log(modelMap)

const run = async () => {
  for (const name in modelMap) {
    console.log(name)
    const Model = modelMap[name]
    const doc = await Model.findOne({}, {}, { lean: true })
    const count = await Model.count({})
    console.log(doc)
    console.log(count)
    
    // 清空数据
    // if (name === 'StockCompany') {
    //   console.log(name)
    //   await Model.deleteMany({})
    // }
  }

  process.exit()
}

setTimeout(run, 3000)
