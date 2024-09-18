const fs = require('fs')
const { join } = require('path')
const moment = require('moment')
const { groupBy, map } = require('lodash')
const xlsx = require('node-xlsx')
const oracle = require('../db/oracle')
const queryOptions = { maxRows: 5000000 }

const run = async () => {
  const yes = moment().subtract(1, 'day').format('YYYYMMDD')
  try {
    const sql =
    `
    select
    b.*
    --a.s_info_windcode, a.s_info_name, b.trade_dt, b.S_DQ_CLOSE, b.S_DQ_ADJCLOSE
    from 
    wind.asharedescription a
    left join
    wind.ashareeodprices b
    on a.s_info_windcode = b.s_info_windcode
    where trade_dt in ('20190104', '${yes}')
    --and a.s_info_windcode = '603963.SH'
    order by a.s_info_windcode, b.trade_dt
    `
    let rows = await oracle.queryP(sql, {}, queryOptions)
    console.log(rows)
    rows = map(groupBy(rows, 'S_INFO_NAME'), (values) => {
      if (values.length !== 2) {
        return
      }
      if (values[0].S_DQ_ADJCLOSE > values[1].S_DQ_ADJCLOSE) {
        values[1].pre_S_DQ_ADJCLOSE = values[0].S_DQ_ADJCLOSE
        values[1].S_DQ_ADJCLOSE_ratio = values[1].S_DQ_ADJCLOSE / values[0].S_DQ_ADJCLOSE - 1
        return Object.values(values[1])
      }
    })
    rows = rows.filter(Boolean)
    console.log(rows[0])
    const buffer = xlsx.build([{
      name: '股票',
      data: rows,
    }])
    fs.writeFileSync(join(__dirname, 'stock-data.xlsx'), buffer)
  } catch (error) {
    console.log(error)
  }

  process.exit()
}

setTimeout(run, 3000)
