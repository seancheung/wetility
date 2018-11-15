/**
 * 注册一个小程序
 * @see https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html
 *
 * @param options
 */
declare function App(options: Partial<App.Options>): App
declare namespace App {
  interface BaseOptions {
    [x: string]: any
  }
  interface Options {
    /**
     * 小程序初始化完成时触发，全局只触发一次。
     *
     * @param info  参数
     */
    onLaunch(this: App, info: LaunchInfo): void
    /**
     * 小程序从前台进入后台时触发。
     */
    onHide(this: App): void
    /**
     * 小程序启动，或从后台进入前台显示时触发。
     *
     * @param info  参数
     */
    onShow(this: App, info: LaunchInfo): void
    /**
     * 小程序发生脚本错误，或者 api 调用失败时触发。
     *
     * @param error 错误信息，包含堆栈
     */
    onError(this: App, error: string): void
    /**
     * 小程序要打开的页面不存在时触发。
     *
     * @param info
     */
    onPageNotFound(this: App, info: PageInfo): void
  }
  interface LaunchInfo {
    /**
     * 打开小程序的路径
     */
    path: string
    /**
     * 打开小程序的query
     */
    query: Record<string, string>
    /**
     * 打开小程序的场景值
     */
    scene: number
    /**
     * shareTicket
     */
    shareTicket: string
    /**
     * 当场景为由从另一个小程序或公众号或App打开时，返回此字段
     */
    referrerInfo?: ReferrerInfo
  }
  interface ReferrerInfo {
    /**
     * 来源小程序或公众号或App的 appId
     */
    appId: string
    /**
     * 来源小程序传过来的数据，scene=1037或1038时支持
     */
    extraData: Record<string, string>
  }
  interface PageInfo {
    /**
     * 不存在页面的路径
     */
    path: string
    /**
     * 打开不存在页面的 query
     */
    query: Record<string, string>
    /**
     * 是否本次启动的首个页面（例如从分享等入口进来，首个页面是开发者配置的分享页面）
     */
    isEntryPage: boolean
  }
}
declare interface App extends App.BaseOptions {}

/**
 * 获取小程序App实例
 *
 * @param options
 */
declare function getApp(options?: getApp.Options): App
declare namespace getApp {
  interface Options {
    /**
     * 在 App 未定义时返回默认实现。当App被调用时，默认实现中定义的属性会被覆盖合并到App中。
     */
    allowDefault: boolean
  }
}

/**
 * 注册一个页面
 * @see https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html
 *
 * @param options
 */
declare function Page(options: Partial<Page.Options>): Page
declare namespace Page {
  interface BaseOptions {
    /**
     * 页面的初始数据
     */
    data?: Readonly<Record<string, any>>

    [x: string]: any
  }
  interface Options extends BaseOptions {
    /**
     * 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
     *
     * @param query
     */
    onLoad(this: Page, query: Record<string, string>): void
    /**
     * 页面显示/切入前台时触发
     */
    onShow(this: Page): void
    /**
     * 页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
     *
     * @description 注意：对界面内容进行设置的 API 如wx.setNavigationBarTitle，请在onReady之后进行。
     */
    onReady(this: Page): void
    /**
     * 页面隐藏/切入后台时触发。 如 navigateTo 或底部 tab 切换到其他页面，小程序切入后台等。
     */
    onHide(this: Page): void
    /**
     * 页面卸载时触发。如redirectTo或navigateBack到其他页面时。
     */
    onUnload(this: Page): void
    /**
     * 监听用户下拉刷新事件。
     */
    onPullDownRefresh(this: Page): void
    /**
     * 监听用户上拉触底事件。
     */
    onReachBottom(this: Page): void
    /**
     * 监听用户滑动页面事件。
     *
     * @param info
     */
    onPageScroll(this: Page, info: ScrollInfo): void
    /**
     * 监听用户点击页面内转发按钮或右上角菜单“转发”按钮的行为，并自定义转发内容。
     *
     * @param info
     */
    onShareAppMessage(this: Page, info: ShareInfo): ShareOptions
    /**
     * 小程序屏幕旋转时触发。
     *
     * @param info
     */
    onResize(this: Page, info: ResizeInfo): void
    /**
     * 点击 tab 时触发
     *
     * @param info
     */
    onTabItemTap(this: Page, info: TabItemTapInfo): void
  }
  interface ScrollInfo {
    /**
     * 页面在垂直方向已滚动的距离（单位px）
     */
    scrollTop: number
  }
  interface ShareInfo {
    /**
     * 转发事件来源。button：页面内转发按钮；menu：右上角转发菜单
     */
    from: string
    /**
     * 如果 from 值是 button，则 target 是触发这次转发事件的 button，否则为 undefined
     */
    target: string
    /**
     * 页面中包含<web-view>组件时，返回当前<web-view>的url
     */
    webViewUrl: string
  }
  interface ShareOptions {
    /**
     * 转发标题
     */
    title: string
    /**
     * 转发路径
     */
    path: string
    /**
     * 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
     */
    imageUrl: string
  }
  interface TabItemTapInfo {
    /**
     * 被点击tabItem的序号，从0开始
     */
    index: string
    /**
     * 被点击tabItem的页面路径
     */
    pagePath: string
    /**
     * 被点击tabItem的按钮文字
     */
    text: string
  }
  interface ResizeInfo {
    size: {
      /**
       * 新的显示区域宽度
       */
      windowWidth: number
      /**
       * 新的显示区域高度
       */
      windowHeight: number
    }
  }
}
declare interface Page extends Page.BaseOptions {
  /**
   * 将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）。
   *
   * @param data
   */
  setData(data: Record<string, any>, callback?: () => void): void
}
/**
 * 用于定义组件
 * @see https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html
 *
 * @param options
 */
declare function Component(options: Partial<Component.Options>): Component
declare namespace Component {
  interface Options<T = Component> {
    /**
     * 组件的对外属性
     */
    properties: Record<string, Property>
    /**
     * 组件的内部数据
     */
    data: Readonly<Record<string, any>>
    /**
     * 组件的方法，包括事件响应函数和任意的自定义方法
     */
    methods: Record<string, (this: T, ...args: any[]) => any>
    /**
     * 类似于mixins和traits的组件间代码复用机制
     */
    behaviors: Array<Behavior | string>
    /**
     * 在组件实例进入页面节点树时执行，注意此时不能调用 setData
     * @deprecated 请使用lifetimes
     */
    created(this: T): void
    /**
     * 在组件实例进入页面节点树时执行
     * @deprecated 请使用lifetimes
     */
    attached(this: T): void
    /**
     * 在组件布局完成后执行，此时可以获取节点信息
     * @deprecated 请使用lifetimes
     */
    ready(this: T): void
    /**
     * 在组件实例被移动到节点树另一个位置时执行
     * @deprecated 请使用lifetimes
     */
    moved(this: T): void
    /**
     * 在组件实例被从页面节点树移除时执行
     * @deprecated 请使用lifetimes
     */
    detached(this: T): void
    /**
     * 组件间关系定义
     */
    relations: Record<string, Relation>
    /**
     * 组件接受的外部样式类
     */
    externalClasses: string[]
    /**
     * 一些选项
     */
    options: Record<string, any>
    /**
     * 组件生命周期声明对象
     */
    lifetimes: Partial<{
      /**
       * 在组件实例进入页面节点树时执行，注意此时不能调用 setData
       */
      created(this: T): void
      /**
       * 在组件实例进入页面节点树时执行
       */
      attached(this: T): void
      /**
       * 在组件布局完成后执行，此时可以获取节点信息
       */
      ready(this: T): void
      /**
       * 在组件实例被移动到节点树另一个位置时执行
       */
      moved(this: T): void
      /**
       * 在组件实例被从页面节点树移除时执行
       */
      detached(this: T): void
    }>
    /**
     * 组件所在页面的生命周期声明对象
     */
    pageLifetimes: Partial<{
      show(this: T): void
      hide(this: T): void
      resize(this: T): void
    }>
    /**
     * 定义段过滤器，用于自定义组件扩展
     */
    definitionFilter: Function
  }
  interface Property {
    /**
     * 属性类型
     */
    type: Property.Type
    /**
     * 属性初始值
     */
    value?: any
    /**
     * 属性值被更改时的响应函数
     */
    observer?: Property.Changed
  }
  namespace Property {
    type Type =
      | typeof String
      | typeof Boolean
      | typeof Number
      | typeof Array
      | typeof Object
      | null
    type Changed = (newVal: any, oldVal: any, changedPath: string) => void
  }
  interface EventOptions {
    /**
     * 事件是否冒泡
     */
    bubbles?: boolean
    /**
     * 事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部
     */
    composed?: boolean
    /**
     * 事件是否拥有捕获阶段
     */
    capturePhase?: boolean
  }
  /**
   * @see https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/relations.html
   */
  interface Relation {
    /**
     * 目标组件的相对关系
     */
    type: 'parent' | 'child' | 'ancestor' | 'descendant'
    /**
     * 关系生命周期函数，当关系被建立在页面节点树中时触发，触发时机在组件attached生命周期之后
     */
    linked?(): void
    /**
     * 关系生命周期函数，当关系在页面节点树中发生改变时触发，触发时机在组件moved生命周期之后
     */
    linkChanged?(): void
    /**
     * 关系生命周期函数，当关系脱离页面节点树时触发，触发时机在组件detached生命周期之后
     */
    unlinked?(): void
    /**
     * 如果这一项被设置，则它表示关联的目标节点所应具有的behavior，所有拥有这一behavior的组件节点都会被关联
     */
    target?: string
  }
}
interface Component {
  /**
   * 组件的文件路径
   */
  is: string
  /**
   * 节点id
   */
  id: string
  /**
   * 节点dataset
   */
  dataset: string
  /**
   * 组件数据，包括内部数据和属性值
   */
  data: Readonly<Record<string, any>>
  /**
   * 组件数据，包括内部数据和属性值（与 data 一致）
   */
  properties: Record<string, any>
  /**
   * 设置data并执行视图层渲染
   *
   * @param newData
   */
  setData(newData: Record<string, any>): void
  /**
   * 检查组件是否具有 behavior （检查时会递归检查被直接或间接引入的所有behavior）
   *
   * @param behavior
   */
  hasBehavior(behavior: Behavior | string): boolean
  /**
   * 触发事件
   *
   * @param name
   * @param detail
   * @param options
   */
  triggerEvent(name: string, detail: any, options: Component.EventOptions): void
  /**
   * 创建一个 SelectorQuery 对象，选择器选取范围为这个组件实例内
   */
  createSelectorQuery(): SelectorQuery
  /**
   * 创建一个 IntersectionObserver 对象，选择器选取范围为这个组件实例内
   */
  createIntersectionObserver(): IntersectionObserver
  /**
   * 使用选择器选择组件实例节点，返回匹配到的第一个组件实例对象（会被 wx://component-export 影响）
   *
   * @param selector
   */
  selectComponent(selector: string): Component
  /**
   * 使用选择器选择组件实例节点，返回匹配到的全部组件实例对象组成的数组
   *
   * @param selector
   */
  selectAllComponents(selector: string): Component[]
  /**
   * 获取这个关系所对应的所有关联节点
   *
   * @param relationKey
   */
  getRelationNodes(relationKey: string): NodesRef[]
  /**
   * 立刻执行 callback ，其中的多个 setData 之间不会触发界面绘制（只有某些特殊场景中需要，如用于在不同组件同时 setData 时进行界面绘制同步）
   *
   * @param callback
   */
  groupSetData(callback: Function): void
}

/**
 * 用于定义behavior
 * @see https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html
 *
 * @param options
 */
declare function Behavior(options: Partial<Behavior.Options>): Behavior
declare namespace Behavior {
  interface Options extends Component.Options<Behavior> {}
}
declare interface Behavior extends Component {}

/**
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/SelectorQuery.html
 */
declare interface SelectorQuery {
  /**
   * 将选择器的选取范围更改为自定义组件 component 内
   *
   * @param component
   */
  in(component: Component): this
  /**
   * 在当前页面下选择第一个匹配选择器 selector 的节点
   *
   * @param selector
   */
  select(selector: string): NodesRef
  /**
   * 在当前页面下选择匹配选择器 selector 的所有节点
   */
  selectAll(): NodesRef
  /**
   * 选择显示区域。可用于获取显示区域的尺寸、滚动位置等信息
   */
  selectViewport(): NodesRef
  /**
   * 执行所有的请求。请求结果按请求次序构成数组，在callback的第一个参数中返回
   *
   * @param callback
   */
  exec(callback: (res: any[]) => void): NodesRef
}
/**
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.html
 */
declare interface NodesRef {}
/**
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/IntersectionObserver.html
 */
declare interface IntersectionObserver {}

declare interface wx {
  /**
   * 判断小程序的API，回调，参数，组件等是否在当前版本可用
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/base/wx.canIUse.html
   *
   * @param schema
   */
  canIUse(schema: string): boolean
  /**
   * 发起 HTTPS 网络请求
   *
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
   * @param options
   */
  request(options: wx.RequestOptions): wx.RequestTask
}
declare namespace wx {
  type Callbacks = 'success' | 'fail' | 'complete'
  interface CallbackOptions<TSuccess = any, TFail = any> {
    success?(res: TSuccess): void
    fail?(error: TFail): void
    complete?(): void
  }
  type CallbackFunc<
    TOptions extends CallbackOptions<TSuccess, TFail>,
    TSuccess = any,
    TFail = any
  > = (opts?: TOptions) => any
  interface RequestOptions extends CallbackOptions<Response> {
    url: string
    data?: string | object | ArrayBuffer
    header?: Record<string, string>
    method?:
      | 'OPTIONS'
      | 'GET'
      | 'HEAD'
      | 'POST'
      | 'PUT'
      | 'DELETE'
      | 'TRACE'
      | 'CONNECT'
    dataType?: string
    responseType?: 'text' | 'arraybuffer'
  }
  /**
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/network/request/RequestTask.html
   */
  interface RequestTask {
    /**
     * 中断请求任务
     */
    abort(): void
  }
  interface Response {
    data: string | object | ArrayBuffer
    statusCode: number
    header: Record<string, string>
  }
}
declare const wx: wx
