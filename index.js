const renegeratorRuntime = require('regenerator-runtime/runtime')

function promisify(func, context) {
  return opts =>
    opts.success || opts.fail || opts.complete
      ? func.call(context, opts)
      : new utils.Promise((resolve, reject) => {
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

const $wx = {
  request: promisify(wx.request)
}

const utils = {
  Promise,
  renegeratorRuntime,
  promisify,
  $wx
}

module.exports = utils
