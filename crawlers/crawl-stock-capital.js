const axios = require('./index')
const moment = require('moment')
const { omit } = require('lodash')

/**
 * 
 * https://data.eastmoney.com/zjlx/300124.html
 * 
 * @param {*} code 
 * @param {*} options 
 * @returns 
 * 
    "code": "300124", // 代码
    "market": 0,
    "name": "汇川技术", // 名称
    "klines": [
        "2022-12-19,-34848485.0,-2543262.0,37391746.0,-60070980.0,25222495.0,-7.91,-0.58,8.48,-13.63,5.72,69.92,-0.11,0.00,0.00",
        日期/主力净流入/小单净流入/中单净流入/大单净流入/超大单净流入/主力净流入比例/中单净流入比例/大单净流入比例/超大单净流入比例/收盘价/当日涨跌幅
 */
const getStockCapital = async (code, options) => {
  try {
    const params = {
      cb: 'jQuery1123048615786110458425_1685082636246',
      lmt: '0',
      klt: '101',
      fields1: 'f1,f2,f3,f7',
      fields2: 'f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63,f64,f65',
      ut: 'b2884a393a59ad64002292a3e90d46a5',
      secid: `0.${code}`,
      _: moment().valueOf(),
    }
    const searchParams = Object.entries(params).map(item => item.join('=')).join('&')
    // console.log(searchParams)
    const url = `https://push2his.eastmoney.com/api/qt/stock/fflow/daykline/get?${searchParams}`
    const resp = await axios.get(url)
    // console.log(resp)
    const { data } = resp
    // console.log(data)
    const reg = /jQuery1123048615786110458425_1685082636246\(([\w\W]+)\)/
    const match = reg.exec(data)
    // console.log(match[1])
    const result = JSON.parse(match[1])
    if (result.data && result.data.klines.length) {
      const info = omit(result.data, ['klines'])
      result.data = result.data.klines.map(kline => ({
        ...info,
        kline,
        create_time: new Date(),
      }))
      result.cameldata = result.data.map(item => {
        const { kline } = item
        const info = kline.split(',')
        return {
          code: item.code,
          name: item.name,
          date: moment(info[0]).format('YYYYMMDD'),
          time: new Date(moment(info[0])),
          main_in_capital: Number(info[1]),
          small_in_capital: Number(info[2]),
          middle_in_capital: Number(info[3]),
          big_in_capital: Number(info[4]),
          super_in_capital: Number(info[5]),
          main_in_capital_ratio: Number(info[6]) / 100,
          small_in_capital_ratio: Number(info[7]) / 100,
          middle_in_capital_ratio: Number(info[8]) / 100,
          big_in_capital_ratio: Number(info[9]) / 100,
          super_in_capital_ratio: Number(info[10]) / 100,
          close_price: Number(info[11]),
          yield: Number(info[12]) / 100,
          create_time: new Date(),
        }
      })
    }
    return result
  } catch (error) {
    console.error(error)
  }
}

exports.getStockCapital = getStockCapital

if (require.main === module) {
  console.log('test')
  setTimeout(async () => {
    const resp = await getStockCapital('300124')
    // console.log(resp)
    console.log(resp.data[0])
    console.log(resp.cameldata[0])
  }, 3000)
}
