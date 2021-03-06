/*
 * @Filename: applyMiddleware.js
 * @Author: jin5354
 * @Email: xiaoyanjinx@gmail.com
 * @Last Modified time: 2017-08-30 15:09:53
 */

/**
 * [applyMiddleware ]
 * @param  {...[type]} middlewares [description]
 * @return {[type]}                [description]
 */
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer)
    let dispatch = store.dispatch

    // 仅仅暴露 getState 和 dispatch 两个 api
    const storeWithLimitedAPI = {
      getState: store.getState(),
      dispatch: dispatch
    }

    // 这里可选使用 compose
    // 使用中间件将 store.dispatch 重写
    middlewares.reverse().forEach(middleware => {
      dispatch = middleware(storeWithLimitedAPI)(dispatch)
    })

    return {
      ...store,
      dispatch
    }
  }
}
