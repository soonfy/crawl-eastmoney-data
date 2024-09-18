const axios = require('axios')

const { sleep } = require('../utils')

/**
 * 
 * https://data.eastmoney.com/gdhs/
 * 
 * @param {*} options 
 * @returns 
 */
const getStock = async (options) => {
  try {
    const { page } = options
    const params = {
      callback: 'jQuery112304156263062980079_1684750929099',
      sortColumns: 'HOLD_NOTICE_DATE,SECURITY_CODE',
      sortTypes: '-1,-1',
      pageSize: '50',
      pageNumber: page,
      reportName: 'RPT_HOLDERNUMLATEST',
      columns: 'SECURITY_CODE,SECURITY_NAME_ABBR,END_DATE,INTERVAL_CHRATE,AVG_MARKET_CAP,AVG_HOLD_NUM,TOTAL_MARKET_CAP,TOTAL_A_SHARES,HOLD_NOTICE_DATE,HOLDER_NUM,PRE_HOLDER_NUM,HOLDER_NUM_CHANGE,HOLDER_NUM_RATIO,END_DATE,PRE_END_DATE',
      quoteColumns: 'f2,f3',
      quoteType: '0',
      source: 'WEB',
      client: 'WEB',
    }
    const searchParams = Object.entries(params).map(item => item.join('=')).join('&')
    // console.log(searchParams)
    const url = `https://datacenter-web.eastmoney.com/api/data/v1/get?${searchParams}`
    const resp = await axios.get(url, params)
    // console.log(resp)
    const { data } = resp
    // console.log(data)
    const reg = /jQuery112304156263062980079_1684750929099\(([\w\W]+)\)/
    const match = reg.exec(data)
    // console.log(match[1])
    const { result } = JSON.parse(match[1])
    console.log(result.data.length)
    return result
  } catch (error) {
    console.error(error)
  }
}

const getAllStock = async () => {
  let count = 1
  let page = 1
  let stocks = []
  while (page <= count) {
    console.log(page)
    const result = await getStock({
      page,
    })
    if (result) {
      page += 1
      count = result.pages
      stocks = [...stocks, ...result.data]
    }
    await sleep(Math.random() * 1000)
  }
  const stockfile = join(__dirname, 'stock-list.xlsx')
  stocks.unshift({
    SECURITY_CODE: '股票代码',
    SECURITY_NAME_ABBR: '股票简称',
    END_DATE: '股东户数统计截止日',
    HOLD_NOTICE_DATE: '股东户数公告日期',
    TOTAL_MARKET_CAP: '总市值',
    TOTAL_A_SHARES: '总股本',
    HOLDER_NUM: '股东户数',
    AVG_HOLD_NUM: '平均持股数量',
  })
  writeXlsx(stockfile, stocks.map(item => [
    item.SECURITY_CODE, item.SECURITY_NAME_ABBR, item.END_DATE, item.HOLD_NOTICE_DATE, item.TOTAL_MARKET_CAP,
    item.TOTAL_A_SHARES, item.HOLDER_NUM, item.AVG_HOLD_NUM
  ]))
}

exports.getStock = getStock
exports.getAllStock = getAllStock

if (require.main) {
  console.log(1)
  setTimeout(() => getStock({ page: 1 }), 3000)
}
