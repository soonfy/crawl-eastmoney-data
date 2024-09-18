const axios = require('./index')
const moment = require('moment')

/**
 * 
 * https://emweb.securities.eastmoney.com/PC_HSF10/CompanySurvey/Index?type=web&code=SZ300124#
 * 
 * @param {*} code 
 * @param {*} options 
 * @returns 
 * 
    {
      "jbzl": [
        {
          "SECUCODE": "300124.SZ",
          "SECURITY_CODE": "300124",
          "SECURITY_NAME_ABBR": "汇川技术",
          "ORG_CODE": "10129026",
          "ORG_NAME": "深圳市汇川技术股份有限公司",
          "ORG_NAME_EN": "Shenzhen Inovance Technology Co., Ltd",
          "FORMERNAME": null,
          "STR_CODEA": "300124",
          "STR_NAMEA": "汇川技术",
          "STR_CODEB": null,
          "STR_NAMEB": null,
          "STR_CODEH": null,
          "STR_NAMEH": null,
          "SECURITY_TYPE": "深交所创业板A股",
          "EM2016": "机械设备-机器人-工业机器人",
          "TRADE_MARKET": "深圳证券交易所",
          "INDUSTRYCSRC1": "制造业-电气机械和器材制造业",
          "PRESIDENT": "朱兴明",
          "LEGAL_PERSON": "朱兴明",
          "SECRETARY": "宋君恩",
          "CHAIRMAN": "朱兴明",
          "SECPRESENT": "曾艳",
          "INDEDIRECTORS": "赵晋琳,黄培,张陶伟",
          "ORG_TEL": "0755-83185787,0755-83185521",
          "ORG_EMAIL": "ir@inovance.com",
          "ORG_FAX": "0755-83185659",
          "ORG_WEB": "www.inovance.com",
          "ADDRESS": "深圳市龙华新区观澜街道高新技术产业园汇川技术总部大厦",
          "REG_ADDRESS": "深圳市龙华新区观澜街道高新技术产业园汇川技术总部大厦",
          "PROVINCE": "广东",
          "ADDRESS_POSTCODE": "518110",
          "REG_CAPITAL": 266114.6676,
          "REG_NUM": "914403007488656882",
          "EMP_NUM": 20256,
          "TATOLNUMBER": 21,
          "LAW_FIRM": "北京市康达(广州)律师事务所",
          "ACCOUNTFIRM_NAME": "信永中和会计师事务所(特殊普通合伙)",
          "ORG_PROFILE": "    深圳市汇川技术股份有限公司(简称“汇川技术”)创立于2003年,聚焦工业领域的自动化、数字化、智能化,专注“信息层、控制层、驱动层、执行层、传感层”核心技术,专注于工业自动化控制产品的研发、生产和销售,定位服务于高端设备制造商,以拥有自主知识产权的工业自动化控制技术为基础,以快速为客户提供个性化的解决方案为主要经营模式,持续致力于以领先技术推进工业文明,快速为客户提供更智能、更精准、更前沿的综合产品及解决方案,是国内工业自动化控制领域的佼佼者和上市企业,入选“2020胡润中国500强民营企业”,排名第93位。汇川技术拥有苏州、杭州、南京、上海、宁波、长春、香港等20余家分子公司。",
          "BUSINESS_SCOPE": "一般经营项目:工业自动化产品、新能源产品、新能源汽车、自动化装备、机械电子设备、物联网产品、机电产品和各种软件的研发、设计、系统集成、销售和技术服务(以上不含限制项目);房屋租赁;投资兴办实业(具体项目另行申报);经营进出口业务(法律、行政法规、国务院决定禁止的项目除外,限制的项目须取得许可后方可经营)。许可经营项目:工业自动化产品、新能源产品、新能源汽车、自动化装备、机械电子设备、物联网产品、机电产品和各种软件的生产。",
          "EXPAND_NAME_ABBR": null
        }
      ],
      "fxxg": [
        {
          "SECUCODE": "300124.SZ",
          "SECURITY_CODE": "300124",
          "FOUND_DATE": "2003-04-10 00:00:00",
          "LISTING_DATE": "2010-09-28 00:00:00",
          "AFTER_ISSUE_PE": 78.13,
          "ONLINE_ISSUE_DATE": "2010-09-13 00:00:00",
          "ISSUE_WAY": "网下询价配售",
          "PAR_VALUE": 1,
          "TOTAL_ISSUE_NUM": 27000000,
          "ISSUE_PRICE": 71.88,
          "DEC_SUMISSUEFEE": 82445000,
          "TOTAL_FUNDS": 1940760000,
          "NET_RAISE_FUNDS": 1858314960,
          "OPEN_PRICE": 89,
          "CLOSE_PRICE": 91.99,
          "TURNOVERRATE": 86.915,
          "HIGH_PRICE": 93.8,
          "OFFLINE_VAP_RATIO": 1.65745856,
          "ONLINE_ISSUE_LWR": 1.4483274
        }
      ]
    }
 */
const getStockCompany = async (windcode) => {
  try {
    const params = {
      type: 'web',
      code: windcode,
    }
    const searchParams = Object.entries(params).map(item => item.join('=')).join('&')
    // console.log(searchParams)
    const url = `https://emweb.securities.eastmoney.com/PC_HSF10/CompanySurvey/PageAjax?${searchParams}#`
    const resp = await axios.get(url)
    // console.log(resp)
    const { data } = resp
    // console.log(data)
    const result = {
      company: data.jbzl,
      issue: data.fxxg,
      camelCompany: data.jbzl.map(item => ({
        code: item.SECURITY_CODE,
        wind_code: item.SECUCODE,
        name: item.SECURITY_NAME_ABBR,
        company_id: item.REG_NUM,
        company_code: item.ORG_CODE,
        company_name: item.ORG_NAME,
        company_name_en: item.ORG_NAME_EN,
        former_name: item.FORMERNAME,
        code_a: item.STR_CODEA,
        code_name_a: item.STR_NAMEA,
        code_b: item.STR_CODEB,
        code_name_b: item.STR_NAMEB,
        code_h: item.STR_CODEH,
        code_name_h: item.STR_NAMEH,
        stock_type: item.SECURITY_TYPE,
        stock_market: item.TRADE_MARKET,
        board_name_inner: item.EM2016,
        board_name: item.INDUSTRYCSRC1,
        president: item.PRESIDENT,
        legal: item.LEGAL_PERSON,
        secretary: item.SECRETARY,
        chairman: item.CHAIRMAN,
        secpresent: item.SECPRESENT,
        indedirectors: item.INDEDIRECTORS,
        telephone: item.ORG_TEL,
        email: item.ORG_EMAIL,
        fax: item.ORG_FAX,
        web: item.ORG_WEB,
        address: item.ADDRESS,
        postcode: item.ADDRESS_POSTCODE,
        province: item.PROVINCE,
        capital: item.REG_CAPITAL,
        worker: item.EMP_NUM,
        manager: item.TATOLNUMBER,
        law_firm: item.LAW_FIRM,
        accounting_firm: item.ACCOUNTFIRM_NAME,
        resume: item.ORG_PROFILE,
        scope: item.BUSINESS_SCOPE,
        create_time: new Date(),
      })),
      camelIssue: data.fxxg.map(item => ({
        code: item.SECURITY_CODE,
        wind_code: item.SECUCODE,
        found_date: new Date(moment(item.FOUND_DATE)),
        issue_date: new Date(moment(item.LISTING_DATE)),
        issue_pe: item.AFTER_ISSUE_PE,
        issue_date_online: new Date(moment(item.ONLINE_ISSUE_DATE)),
        issue_way: item.ISSUE_WAY,
        stock_value: item.PAR_VALUE,
        total_holder: item.TOTAL_ISSUE_NUM,
        issue_price: item.ISSUE_PRICE,
        issue_fee: item.DEC_SUMISSUEFEE,
        total_asset: item.TOTAL_FUNDS,
        raise_asset: item.NET_RAISE_FUNDS,
        open_price: item.OPEN_PRICE,
        close_price: item.CLOSE_PRICE,
        max_price: item.HIGH_PRICE,
        turnover: item.TURNOVERRATE / 100,
        offline_winning_ratio: item.OFFLINE_VAP_RATIO / 100,
        pricing_winning_ratio: item.ONLINE_ISSUE_LWR / 100,
        create_time: new Date(),
      })),
    }
    return result
  } catch (error) {
    console.error(error)
  }
}

exports.getStockCompany = getStockCompany

if (require.main === module) {
  console.log('test')
  setTimeout(async () => {
    const resp = await getStockCompany('SZ300124')
    console.log(resp)
    // console.log(resp.data[0])
    // console.log(resp.cameldata[0])
  }, 3000)
}
