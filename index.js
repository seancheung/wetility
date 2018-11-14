const Promise = require('bluebird/js/browser/bluebird')
const renegeratorRuntime = require('regenerator-runtime/runtime')

function promisify(func, context) {
  return opts => {
    new Promise((resolve, reject) => {
      func.call(context, {
        ...opts,
        success: resolve,
        fail: res => {
          if (res != null && !(res instanceof Error)) {
            if (typeof res === 'string') {
              reject(new Error(res))
            } else {
              res = res.errMsg || JSON.stringify(res)
            }
          }
          reject(res)
        }
      })
    })
  }
}

module.exports = {
  promisify,
  renegeratorRuntime,
  Promise
}
