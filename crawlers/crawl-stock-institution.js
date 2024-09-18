const axios = require('./index')
const moment = require('moment')

/**
 * 
 * https://data.eastmoney.com/stockcomment/stock/300124.html
 * 
 * @param {*} code 
 * @param {*} options 
 * @returns 
 * 
    "SECURITY_INNER_CODE": "1000007854", 内部代码
    "SECURITY_CODE": "300124", 代码
    "SECUCODE": "300124.SZ", 前端代码
    "TRADE_DATE": "2023-05-23 00:00:00", 数据日期
    "SECURITY_NAME_ABBR": "汇川技术", 股票名称
    "SUPERDEAL_INFLOW": 51772084, 超大流入
    "SUPERDEAL_OUTFLOW": 40838951, 超大流出
    "PRIME_INFLOW": 13455214, 净流入
    "CLOSE_PRICE": 60.56, 收盘价
    "CHANGE_RATE": 0.4312, 涨跌幅
    "TRADE_MARKET_CODE": "069001002002", 交易市场代码
    "TURNOVERRATE": 0.6759, 换手率
    "PRIME_COST": 61.137733386143, 均价
    "PE_DYNAMIC": 53.92444316, PE
    "PRIME_COST_20DAYS": 59.5775632564, 最近 20 日成本
    "PRIME_COST_60DAYS": 66.039977707251, 最近 60 日成本
    "ORG_PARTICIPATE": 0.2719644, 机构参与度
    "PARTICIPATE_TYPE": "2", 参与度代码
    "BIGDEAL_INFLOW": 213188843, 大流入
    "BIGDEAL_OUTFLOW": 210666762, 大流出
    "BUY_SUPERDEAL_RATIO": 0.0542, 超大比例 
    "BUY_BIGDEAL_RATIO": 0.223, 大比例
    "RATIO": 0.2772,
    "RATIO_3DAYS": 0.262933333333,
    "RATIO_50DAYS": 0.272422,
    "TOTALSCORE": null,
    "RANK_UP": null,
    "RANK": null,
    "FOCUS": null,
    "SECURITY_TYPE_CODE": "058001001",
    "PARTICIPATE_TYPE_CN": "中度控盘" 参与度类型
 */
const getStockInstitution = async (code, options) => {
  try {
    const { page } = options
    const params = {
      callback: 'jQuery1123034369151779816653_1684823500768',
      reportName: 'RPT_DMSK_TS_STOCKEVALUATE',
      filter: `(SECURITY_CODE="${code}")`,
      columns: 'ALL',
      source: 'WEB',
      client: 'WEB',
      sortColumns: 'TRADE_DATE',
      sortTypes: '-1',
      _: moment().valueOf(),
    }
    const searchParams = Object.entries(params).map(item => item.join('=')).join('&')
    // console.log(searchParams)
    const url = `https://datacenter-web.eastmoney.com/api/data/v1/get?${searchParams}`
    const resp = await axios.get(url)
    // console.log(resp)
    const { data } = resp
    // console.log(data)
    const reg = /jQuery1123034369151779816653_1684823500768\(([\w\W]+)\)/
    const match = reg.exec(data)
    // console.log(match[1])
    const { result } = JSON.parse(match[1])
    if (result && result.data.length) {
      result.data.forEach(item => item.create_time = new Date())
      result.cameldata = result.data.map(item => ({
        code: item.SECURITY_CODE,
        wind_code: item.SECUCODE,
        inner_code: item.SECURITY_INNER_CODE,
        name: item.SECURITY_NAME_ABBR,
        date: moment(item.TRADE_DATE).format('YYYYMMDD'),
        time: new Date(moment(item.TRADE_DATE)),
        ratio: item.ORG_PARTICIPATE,
        type_code: item.PARTICIPATE_TYPE,
        type: item.PARTICIPATE_TYPE_CN,
        super_buy: item.SUPERDEAL_INFLOW,
        super_sell: item.SUPERDEAL_OUTFLOW,
        big_buy: item.BIGDEAL_INFLOW,
        big_sell: item.BIGDEAL_OUTFLOW,
        net_buy: item.PRIME_INFLOW,
        super_ratio: item.BUY_SUPERDEAL_RATIO,
        big_ratio: item.BUY_BIGDEAL_RATIO,
        average_cost: item.PRIME_COST,
        average_cost_20: item.PRIME_COST_20DAYS,
        average_cost_60: item.PRIME_COST_60DAYS,
        close_price: item.CLOSE_PRICE,
        yield: item.CHANGE_RATE / 100,
        turnover: item.TURNOVERRATE / 100,
        dynamic_pe: item.PE_DYNAMIC,
        create_time: new Date(),
      }))
    }
    return result
  } catch (error) {
    console.error(error)
  }
}

exports.getStockInstitution = getStockInstitution

if (require.main === module) {
  console.log('test')
  setTimeout(async () => {
    const resp = await getStockInstitution('300124', { page: 1 })
    // console.log(resp)
    console.log(resp.data[0])
    console.log(resp.cameldata[0])
  }, 3000)
}
