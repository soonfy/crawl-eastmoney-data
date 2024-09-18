const queueMap = require('../queues/create-queue')
console.log(queueMap)

const run = async () => {
  for (const name in queueMap) {
    console.log(name)
    if (name !== 'createQueue') {
      const queue = queueMap[name]
      const doc = await queue.getJobCounts()
      console.log(doc)
      // 清空任务
      // await queue.empty()
    }
  }

  process.exit()
}

setTimeout(run, 3000)
