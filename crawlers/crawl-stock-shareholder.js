const axios = require('./index')
const moment = require('moment')

/**
 * 
 * https://data.eastmoney.com/gdhs/detail/300124.html
 * 
 * @param {*} code 
 * @param {*} options 
 * @returns 
 * 
    "SECURITY_CODE": "300124", 代码
    "SECURITY_NAME_ABBR": "汇川技术", 名称
    "CHANGE_SHARES": 811800, 股本变动
    "CHANGE_REASON": "股权激励", 股本变动原因
    "END_DATE": "2023-05-19 00:00:00", 股东户数统计截止日
    "INTERVAL_CHRATE": 1.5826087, 上次股东户数统计截止日到这次股东户数统计截止日区间涨跌幅
    "AVG_MARKET_CAP": 2246954.58526909, 户均持股市值
    "AVG_HOLD_NUM": 38468.6626479899, 户均持股数量
    "TOTAL_MARKET_CAP": 155437577345.16, 总市值
    "TOTAL_A_SHARES": 2661146676, 总股本
    "HOLD_NOTICE_DATE": "2023-05-22 00:00:00", 股东户数公告日期
    "HOLDER_NUM": 69177, 股东户数
    "PRE_HOLDER_NUM": 67629, 上次股东户数
    "HOLDER_NUM_CHANGE": 1548, 股东户数增减
    "HOLDER_NUM_RATIO": 2.288958878588, 股东户数增减比例
    "PRE_END_DATE": "2023-05-10 00:00:00", 上次股东户数统计截止日
    "f2": 60.2,
    "f3": -0.59
 */
const getStockShareholder = async (code, options) => {
  try {
    const { page } = options
    const params = {
      callback: 'jQuery112305952604730114328_1684746337813',
      sortColumns: 'END_DATE',
      sortTypes: '-1',
      pageSize: '50',
      pageNumber: page,
      reportName: 'RPT_HOLDERNUM_DET',
      columns: 'SECURITY_CODE,SECURITY_NAME_ABBR,CHANGE_SHARES,CHANGE_REASON,END_DATE,INTERVAL_CHRATE,AVG_MARKET_CAP,AVG_HOLD_NUM,TOTAL_MARKET_CAP,TOTAL_A_SHARES,HOLD_NOTICE_DATE,HOLDER_NUM,PRE_HOLDER_NUM,HOLDER_NUM_CHANGE,HOLDER_NUM_RATIO,END_DATE,PRE_END_DATE',
      quoteColumns: 'f2,f3',
      quoteType: '0',
      filter: `(SECURITY_CODE="${code}")`,
      source: 'WEB',
      client: 'WEB',
    }
    const searchParams = Object.entries(params).map(item => item.join('=')).join('&')
    // console.log(searchParams)
    const url = `https://datacenter-web.eastmoney.com/api/data/v1/get?${searchParams}`
    const resp = await axios.get(url)
    // console.log(resp)
    const { data } = resp
    // console.log(data)
    const reg = /jQuery112305952604730114328_1684746337813\(([\w\W]+)\)/
    const match = reg.exec(data)
    // console.log(match[1])
    const { result } = JSON.parse(match[1])
    if (result && result.data.length) {
      result.data.forEach(item => item.create_time = new Date())
      result.cameldata = result.data.map(item => ({
        code: item.SECURITY_CODE,
        name: item.SECURITY_NAME_ABBR,
        date: moment(item.END_DATE).format('YYYYMMDD'),
        time: new Date(moment(item.END_DATE)),
        publish_date: moment(item.HOLD_NOTICE_DATE).format('YYYYMMDD'),
        holder: item.HOLDER_NUM,
        pre_holder: item.PRE_HOLDER_NUM,
        pre_holder_date: moment(item.PRE_END_DATE).format('YYYYMMDD'),
        holder_change_ratio: item.HOLDER_NUM_RATIO / 100,
        total_share: item.TOTAL_A_SHARES,
        total_asset: item.TOTAL_MARKET_CAP,
        average_holder_share: item.AVG_HOLD_NUM,
        average_holder_asset: item.AVG_MARKET_CAP,
        change_share: item.CHANGE_SHARES,
        change_reason: item.CHANGE_REASON,
        yield: item.INTERVAL_CHRATE / 100,
        create_time: new Date(),
      }))
    }
    return result
  } catch (error) {
    console.error(error)
  }
}

exports.getStockShareholder = getStockShareholder

if (require.main === module) {
  console.log('test')
  setTimeout(async () => {
    const resp = await getStockShareholder('300124', { page: 1 })
    // console.log(resp)
    console.log(resp.data[0])
    console.log(resp.cameldata[0])
  }, 3000)
}