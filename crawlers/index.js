const axios = require('axios')

const instance = axios.create()
instance.defaults.headers.common['Accept'] = '*/*'
instance.defaults.headers.common['Accept-Encoding'] = 'gzip, deflate, br'
instance.defaults.headers.common['Accept-Language'] = 'zh-CN,zh;q=0.9'
instance.defaults.headers.common['Connection'] = 'keep-alive'
// instance.defaults.headers.common['Host'] = 'datacenter-web.eastmoney.com'
instance.defaults.headers.common['Referer'] = 'https://data.eastmoney.com/'
instance.defaults.headers.common['sec-ch-ua'] = '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"'
instance.defaults.headers.common['sec-ch-ua-mobile'] = '?0'
instance.defaults.headers.common['sec-ch-ua-platform'] = '"macOS"'
instance.defaults.headers.common['Sec-Fetch-Dest'] = 'script'
instance.defaults.headers.common['Sec-Fetch-Mode'] = 'no-cors'
instance.defaults.headers.common['Sec-Fetch-Site'] = 'same-site'
instance.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'

instance.defaults.timeout = 1000 * 60

module.exports = instance
