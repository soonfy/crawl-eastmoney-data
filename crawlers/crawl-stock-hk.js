const axios = require('./index')
const moment = require('moment')

/**
 * 
 * https://data.eastmoney.com/hsgtcg/StockHdStatistics/300124.html
 * 
 * @param {*} code 
 * @param {*} options 
 * @returns 
 * 
    "SECURITY_INNER_CODE": "1000007854", 内部代码
    "SECUCODE": "300124.SZ", 后缀代码
    "TRADE_DATE": "2023-05-23 00:00:00", 数据日期
    "SECURITY_CODE": "300124", 代码
    "SECURITY_NAME": "汇川技术", 名称
    "MUTUAL_TYPE": "003",
    "CHANGE_RATE": 0.431177446103, 当日涨跌幅
    "CLOSE_PRICE": 60.56, 当日收盘价
    "HOLD_SHARES": 624784154, 持股数量
    "HOLD_MARKET_CAP": 37836928366.24, 持股市值
    "A_SHARES_RATIO": 23.48, 持股数量占A股百分比
    "HOLD_SHARES_RATIO": 23.47,
    "FREE_SHARES_RATIO": 27.0121,
    "TOTAL_SHARES_RATIO": 23.478,
    "HOLD_MARKETCAP_CHG1": 249294030.34, 1天持股市值变化
    "HOLD_MARKETCAP_CHG5": 1720998721.41, 5天持股市值变化
    "HOLD_MARKETCAP_CHG10": 1689230292.52 10天持股市值变化
 */
const getStockHk = async (code, options) => {
  try {
    const { page } = options
    const date = moment().subtract(2, 'month').format('YYYY-MM-DD')
    // console.log(date)
    const params = {
      callback: 'jQuery1123041009270432466605_1684808095301',
      sortColumns: 'TRADE_DATE',
      sortTypes: '-1',
      pageSize: '50',
      pageNumber: page,
      reportName: 'RPT_MUTUAL_HOLDSTOCKNORTH_STA',
      columns: 'ALL',
      source: 'WEB',
      client: 'WEB',
      filter: `(SECURITY_CODE="${code}")(TRADE_DATE>='${date}')`,
    }
    const searchParams = Object.entries(params).map(item => item.join('=')).join('&')
    // console.log(searchParams)
    const url = `https://datacenter-web.eastmoney.com/api/data/v1/get?${searchParams}`
    const resp = await axios.get(url)
    // console.log(resp)
    const { data } = resp
    // console.log(data)
    const reg = /jQuery1123041009270432466605_1684808095301\(([\w\W]+)\)/
    const match = reg.exec(data)
    // console.log(match[1])
    const { result } = JSON.parse(match[1])
    // console.log(result)
    if (result && result.data.length) {
      result.data.forEach(item => item.create_time = new Date())
      result.cameldata = result.data.map(item => ({
        code: item.SECURITY_CODE,
        wind_code: item.SECUCODE,
        inner_code: item.SECURITY_INNER_CODE,
        name: item.SECURITY_NAME,
        date: moment(item.TRADE_DATE).format('YYYYMMDD'),
        time: new Date(moment(item.TRADE_DATE)),
        holder: item.HOLD_SHARES,
        asset: item.HOLD_MARKET_CAP,
        ratio: item.A_SHARES_RATIO / 100,
        close_price: item.CLOSE_PRICE,
        yield: item.CHANGE_RATE / 100,
        create_time: new Date(),
      }))
    }
    return result
  } catch (error) {
    console.error(error)
  }
}

exports.getStockHk = getStockHk

if (require.main === module) {
  console.log('test')
  setTimeout(async () => {
    const resp = await getStockHk('300124', { page: 1 })
    // console.log(resp)
    console.log(resp.data[0])
    console.log(resp.cameldata[0])
  }, 3000)
}
