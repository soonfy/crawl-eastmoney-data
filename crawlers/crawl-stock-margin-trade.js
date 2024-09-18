const moment = require('moment')
const axios = require('./index')

/**
 * 
 * https://data.eastmoney.com/rzrq/stock/300124.html
 * 
 * @param {*} code 
 * @param {*} options 
 * @returns 
    "DATE": "2023-05-23 00:00:00", 数据日期
    "MARKET": "融资融券_深证", 市场
    "SCODE": "300124", 代码
    "SECNAME": "汇川技术", 名称
    "RZYE": 683707523, 融资余额
    "RQYL": 3780420, 融券余量（股）
    "RZRQYE": 912649758, 融资融券余额总值
    "RQYE": 228942235, 融券余额
    "RQMCL": 27300, 融券卖出量（股）
    "RZRQYECZ": 454765288, 融资融券余额差值
    "RZMRE": 25179369, 融资买入金额
    "SZ": 140073868467.52, 
    "RZYEZB": 0.48810498, 融资余额占流通市值比
    "RZMRE3D": 85956597, 3天融资买入金额
    "RZMRE5D": 145197726, 5天融资买入金额
    "RZMRE10D": 246492466, 10天融资买入金额
    "RZCHE": 43804188, 融资偿还金额
    "RZCHE3D": 117132194, 3天融资偿还金额
    "RZCHE5D": 167737662, 5天融资偿还金额
    "RZCHE10D": 250701300, 10天融资偿还金额
    "RZJME": -18624819, 融资净买入金额
    "RZJME3D": -31175597, 3天融资净买入金额
    "RZJME5D": -22539936, 5天融资净买入金额
    "RZJME10D": -4208834, 10天融资净买入金额
    "RQMCL3D": 88900, 3天融券卖出量（股）
    "RQMCL5D": 144800, 5天融券卖出量（股）
    "RQMCL10D": 647290, 10天融券卖出量（股）
    "RQCHL": 33200, 融券偿还量（股）
    "RQCHL3D": 102496, 3天融券偿还量（股）
    "RQCHL5D": 203986, 5天融券偿还量（股）
    "RQCHL10D": 615090, 10天融券偿还量（股）
    "RQJMG": -5900, 融券净卖出量（股）
    "RQJMG3D": -13596, 3天融券净卖出量（股）
    "RQJMG5D": -59186, 5天融券净卖出量（股）
    "RQJMG10D": 32200, 10天融券净卖出量（股）
    "SPJ": 60.56, 收盘价
    "ZDF": 0.4312, 涨跌幅
    "RCHANGE3DCP": 2.3492, 
    "RCHANGE5DCP": 4.6122,
    "RCHANGE10DCP": 4.8114,
    "KCB": 0,
    "TRADE_MARKET_CODE": "069001002002", 市场代码
    "TRADE_MARKET": "深交所创业板", 市场
    "FIN_BALANCE_GR": -2.651852675183,
    "SECUCODE": "300124.SZ" 后缀代码
 */
const getStockMarginTrade = async (code, options) => {
  try {
    const { page } = options
    const time = moment().valueOf()
    const params = {
      callback: 'datatable649069',
      reportName: 'RPTA_WEB_RZRQ_GGMX',
      columns: 'ALL',
      source: 'WEB',
      sortColumns: 'date',
      sortTypes: '-1',
      pageNumber: page,
      pageSize: '50',
      filter: `(scode="${code}")`,
      pageNo: page,
      p: page,
      pageNum: page,
      _: time,
    }
    const searchParams = Object.entries(params).map(item => item.join('=')).join('&')
    // console.log(searchParams)
    const url = `https://datacenter-web.eastmoney.com/api/data/v1/get?${searchParams}`
    const resp = await axios.get(url)
    // console.log(resp)
    const { data } = resp
    // console.log(data)
    const reg = /datatable649069\(([\w\W]+)\)/
    const match = reg.exec(data)
    // console.log(match[1])
    const { result } = JSON.parse(match[1])
    if (result && result.data.length) {
      result.data.forEach(item => item.create_time = new Date())
      result.cameldata = result.data.map(item => ({
        code: item.SCODE,
        wind_code: item.SECUCODE,
        name: item.SECNAME,
        date: moment(item.DATE).format('YYYYMMDD'),
        time: new Date(moment(item.DATE)),
        financing_lending_sum: item.RZRQYE,
        financing_lending_diff: item.RZRQYECZ,
        financing_asset: item.RZYE,
        financing_asset_ratio: item.RZYEZB / 100,
        financing_in_asset: item.RZMRE,
        financing_in_asset_3: item.RZMRE3D,
        financing_in_asset_5: item.RZMRE5D,
        financing_in_asset_10: item.RZMRE10D,
        financing_out_asset: item.RZCHE,
        financing_out_asset_3: item.RZCHE3D,
        financing_out_asset_5: item.RZCHE5D,
        financing_out_asset_10: item.RZCHE10D,
        financing_net_asset: item.RZJME,
        financing_net_asset_3: item.RZJME3D,
        financing_net_asset_5: item.RZJME5D,
        financing_net_asset_10: item.RZJME10D,
        lending_num: item.RQYL,
        lending_asset: item.RQYE,
        lending_in_num: item.RQMCL,
        lending_in_num_3: item.RQMCL3D,
        lending_in_num_5: item.RQMCL5D,
        lending_in_num_10: item.RQMCL10D,
        lending_out_num: item.RQCHL,
        lending_out_num_3: item.RQCHL3D,
        lending_out_num_5: item.RQCHL5D,
        lending_out_num_10: item.RQCHL10D,
        lending_net_num: item.RQJMG,
        lending_net_num_3: item.RQJMG3D,
        lending_net_num_5: item.RQJMG5D,
        lending_net_num_10: item.RQJMG10D,
        close_price: item.SPJ,
        yield: item.ZDF / 100,
        market_code: item.TRADE_MARKET_CODE,
        market: item.TRADE_MARKET,
        create_time: new Date(),
      }))
    }
    return result
  } catch (error) {
    console.error(error)
  }
}

const run = async () => {
  const stockfile = join(__dirname, 'stock-list.xlsx')
  const { data } = xlsx.parse(stockfile)[0]
  // console.log(data)
  const stockUserfile = join(__dirname, 'stock-hk-list.xlsx')
  let stocks = []
  for (const stock of data.slice(1)) {
    console.log(stock[1])
    let count = 2
    let page = 1
    while (page <= count) {
      console.log(page)
      const result = await getStockRatio(stock[0], {
        page,
      })
      if (result) {
        page += 1
        count = result.pages
        stocks = [...stocks, ...result.data]
      }
      await sleep(Math.random() * 1000 * 5)
    }
  }
  stocks.unshift({
    SECUCODE: '股票代码后缀',
    SCODE: '股票代码',
    SECNAME: '股票简称',
    TRADE_MARKET: '交易市场',
    DATE: '交易日期',
    RZYE: '融资余额',
    RZYEZB: '融资余额占流通市值比',
    RZMRE: '融资买入金额',
    RZCHE: '融资偿还金额',
    RZJME: '融资净买入金额',
    RQYE: '融券余额',
    RQYL: '融券余量（股）',
    RQMCL: '融券卖出量（股）',
    RQCHL: '融券偿还量（股）',
    RQJMG: '融券净卖出量（股）',
    RZRQYE: '融资融券余额总值',
    RZRQYECZ: '融资融券余额差值',
  })
  writeXlsx(stockUserfile, stocks.map(item => [
    item.SECUCODE, item.SCODE, item.SECNAME, item.TRADE_MARKET, item.DATE,
    item.RZYE, item.RZYEZB, item.RZMRE, item.RZCHE, item.RZJME,
    item.RQYE, item.RQYL, item.RQMCL, item.RQCHL, item.RQJMG,
    item.RZRQYE, item.RZRQYECZ
  ]))
}

exports.getStockMarginTrade = getStockMarginTrade

if (require.main === module) {
  console.log('test')
  setTimeout(async () => {
    const resp = await getStockMarginTrade('300124', { page: 1 })
    // console.log(resp)
    console.log(resp.data[0])
    console.log(resp.cameldata[0])
  }, 3000)
}
