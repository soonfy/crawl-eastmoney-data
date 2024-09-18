const sleep = async ms => await new Promise(resolve => setTimeout(resolve, ms))

exports.sleep = sleep
