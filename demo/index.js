/* 这里演示一个更新token的例子 */
import eventBus, { types } from '../index'

let updateCount = 0
let token = ''

let updateTokenEvent = eventBus.register(types.UPDATE_TOKEN, (data) => {
  console.log(`第${updateCount + 1}次更新token，老token的值为${token}，新token的值为${data.token}`)
  token = data.token
})

// 17秒后，退订事件，不再接受token更新
setTimeout(() => {
  console.log('已经退订 UPDATE_TOKEN 事件')
  eventBus.unregister(types.UPDATE_TOKEN, updateTokenEvent)
}, 17000)
