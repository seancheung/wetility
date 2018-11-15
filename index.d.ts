/// <reference path="wx.d.ts" />
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
declare namespace WeChat {
  type WrappedFunc<
    TOptions extends wx.CallbackOptions<TSuccess, TFail>,
    TSuccess,
    TFail
  > = (opts?: Omit<TOptions, wx.Callbacks>) => Promise<TSuccess>
  type Promisifed<
    TOptions extends wx.CallbackOptions<TSuccess, TFail>,
    TSuccess,
    TFail
  > = WrappedFunc<TOptions, TSuccess, TFail>
  /**
   * Regenerator runtime injection
   */
  const renegeratorRuntime: any
  let Promise: PromiseConstructor
  /**
   * Promisify a wx function
   *
   * @param func wx function
   * @param context Context
   */
  function promisify<
    TOptions extends wx.CallbackOptions<TSuccess, TFail>,
    TSuccess = any,
    TFail = any
  >(
    func: wx.CallbackFunc<TOptions, TSuccess, TFail>,
    context?: any
  ): Promisifed<TOptions, TSuccess, TFail>
  interface $wx {
    request: Promisifed<wx.RequestOptions, wx.Response, any>
  }
  const $wx: $wx
}

export = WeChat
