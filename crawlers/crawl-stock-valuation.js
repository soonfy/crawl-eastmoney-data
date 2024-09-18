const axios = require('./index')
const moment = require('moment')

/**
 * 
 * https://data.eastmoney.com/gzfx/detail/300124.html
 * 
 * @param {*} code 
 * @param {*} options 
 * @returns 
 * 
    "SECURITY_CODE": "300124", 代码
    "SECUCODE": "300124.SZ", 后缀代码
    "SECURITY_NAME_ABBR": "汇川技术", 名称
    "ORG_CODE": "10129026",
    "TRADE_MARKET": "069001002002", 市场代码
    "BOARD_CODE": "016022", 行业代码
    "BOARD_NAME": "电子元件", 行业名称
    "ORIG_BOARD_CODE": "459",
    "TOTAL_MARKET_CAP": 160201029895.2, 市值
    "NOTLIMITED_MARKETCAP_A": 139241196858.4, 流通市值
    "CLOSE_PRICE": 60.2, 收盘价
    "CHANGE_RATE": -0.594451783355, 涨跌幅
    "TOTAL_SHARES": 2661146676, 总股本
    "FREE_SHARES_A": 2312976692, 流通股本
    "PE_TTM": 36.83189713, 滚动市盈率
    "PE_LAR": 37.08561177, 静态市盈率
    "PB_MRQ": 7.68499526, 市净率
    "PCF_OCF_LAR": 50.0498328, 静态市现率
    "PCF_OCF_TTM": 45.06914658, 动态市现率
    "PS_TTM": 6.96167039, 动态市销率
    "PEG_CAR": 1.700801593611, 市盈率相对盈利增长比率
    "TRADE_DATE": "2023-05-24 00:00:00" 数据日期
 */
const getStockValuation = async (code, options) => {
  try {
    const { page } = options
    const params = {
      callback: 'jQuery112305973499947744907_1684985054616',
      sortColumns: 'TRADE_DATE',
      sortTypes: '-1',
      pageSize: '50',
      pageNumber: page,
      reportName: 'RPT_VALUEANALYSIS_DET',
      columns: 'ALL',
      quoteColumns: '',
      source: 'WEB',
      client: 'WEB',
      filter: `(SECURITY_CODE="${code}")`,
    }
    const searchParams = Object.entries(params).map(item => item.join('=')).join('&')
    // console.log(searchParams)
    const url = `https://datacenter-web.eastmoney.com/api/data/v1/get?${searchParams}`
    const resp = await axios.get(url)
    // console.log(resp)
    const { data } = resp
    // console.log(data)
    const reg = /jQuery112305973499947744907_1684985054616\(([\w\W]+)\)/
    const match = reg.exec(data)
    // console.log(match[1])
    const { result } = JSON.parse(match[1])
    if (result && result.data.length) {
      result.data.forEach(item => item.create_time = new Date())
      result.cameldata = result.data.map(item => ({
        code: item.SECURITY_CODE,
        wind_code: item.SECUCODE,
        name: item.SECURITY_NAME_ABBR,
        date: moment(item.TRADE_DATE).format('YYYYMMDD'),
        time: new Date(moment(item.TRADE_DATE)),
        total_asset: item.TOTAL_MARKET_CAP,
        outstanding_asset: item.NOTLIMITED_MARKETCAP_A,
        total_share: item.TOTAL_SHARES,
        outstanding_share: item.FREE_SHARES_A,
        static_pe: item.PE_LAR,
        dynamic_pe: item.PE_TTM,
        dynamic_pb: item.PB_MRQ,
        static_pcf: item.PCF_OCF_LAR,
        dynamic_pcf: item.PCF_OCF_TTM,
        dynamic_ps: item.PS_TTM,
        dynamic_peg: item.PEG_CAR,
        close_price: item.CLOSE_PRICE,
        yield: item.CHANGE_RATE / 100,
        board_code: item.BOARD_CODE,
        board_name: item.BOARD_NAME,
        create_time: new Date(),
      }))
    }
    return result
  } catch (error) {
    console.error(error)
  }
}

exports.getStockValuation = getStockValuation

if (require.main === module) {
  console.log('test')
  setTimeout(async () => {
    const resp = await getStockValuation('300124', { page: 1 })
    // console.log(resp)
    console.log(resp.data[0])
    console.log(resp.cameldata[0])
  }, 3000)
}
