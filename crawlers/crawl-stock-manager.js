const axios = require('./index')
const moment = require('moment')

/**
 * 
 * https://data.eastmoney.com/executive/300124.html
 * 
 * @param {*} code 
 * @param {*} options 
 * @returns 
 * 
    "SECURITY_CODE": "300124", 代码
    "DERIVE_SECURITY_CODE": "300124.SZ", 后缀代码
    "SECURITY_NAME": "汇川技术", 名称
    "CHANGE_DATE": "2023-04-27 00:00:00", 数据日期
    "PERSON_NAME": "丁龙山", 变动人
    "CHANGE_SHARES": 30000, 变动股数
    "AVERAGE_PRICE": 61.22, 成交均价
    "CHANGE_AMOUNT": 1836600, 变动金额
    "CHANGE_REASON": "竞价交易", 变动原因
    "CHANGE_RATIO": 0.0011, 变动比例
    "CHANGE_AFTER_HOLDNUM": 4553000, 变动后持股数量
    "HOLD_TYPE": "A股", 持股种类
    "DSE_PERSON_NAME": "丁龙山", 高管姓名
    "POSITION_NAME": "监事", 职务
    "PERSON_DSE_RELATION": "本人", 变动人和高管的关系
    "ORG_CODE": "10129026", 
    "GGEID": 173000006546648516,
    "BEGIN_HOLD_NUM": null, 变动前持股数量
    "END_HOLD_NUM": 4553000 变动后持股数量
 */
const getStockManager = async (code, options) => {
  try {
    const { page } = options
    const params = {
      callback: 'datatable9187484',
      reportName: 'RPT_EXECUTIVE_HOLD_DETAILS',
      columns: 'ALL',
      quoteColumns: '',
      filter: `(SECURITY_CODE="${code}")`,
      pageNumber: page,
      pageSize: '30',
      sortTypes: '-1,1,1',
      sortColumns: 'CHANGE_DATE,SECURITY_CODE,PERSON_NAME',
      source: 'WEB',
      client: 'WEB',
      p: page,
      pageNo: page,
      pageNum: page,
      _: moment().valueOf(),
    }
    const searchParams = Object.entries(params).map(item => item.join('=')).join('&')
    // console.log(searchParams)
    const url = `https://datacenter-web.eastmoney.com/api/data/v1/get?${searchParams}`
    const resp = await axios.get(url)
    // console.log(resp)
    const { data } = resp
    // console.log(data)
    const reg = /datatable9187484\(([\w\W]+)\)/
    const match = reg.exec(data)
    // console.log(match[1])
    const { result } = JSON.parse(match[1])
    if (result && result.data.length) {
      result.data.forEach(item => item.create_time = new Date())
      result.cameldata = result.data.map(item => ({
        code: item.SECURITY_CODE,
        wind_code: item.DERIVE_SECURITY_CODE,
        name: item.SECURITY_NAME,
        date: moment(item.CHANGE_DATE).format('YYYYMMDD'),
        time: new Date(moment(item.CHANGE_DATE)),
        change_person: item.PERSON_NAME,
        change_holder: item.CHANGE_SHARES,
        change_reason: item.CHANGE_REASON,
        change_ratio: item.CHANGE_RATIO / 100,
        holder: item.CHANGE_AFTER_HOLDNUM,
        holder_type: item.HOLD_TYPE,
        manager_name: item.DSE_PERSON_NAME,
        manager_position: item.POSITION_NAME,
        relation: item.PERSON_DSE_RELATION,
        create_time: new Date(),
      }))
    }
    return result
  } catch (error) {
    console.error(error)
  }
}

exports.getStockManager = getStockManager

if (require.main === module) {
  console.log('test')
  setTimeout(async () => {
    const resp = await getStockManager('300124', { page: 1 })
    // console.log(resp)
    console.log(resp.data[0])
    console.log(resp.cameldata[0])
  }, 3000)
}
