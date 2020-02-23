/* 模拟获取token的操作 */
import eventBus, { types } from '../index'

// 每隔5秒取一次新token
setInterval(() => {
  const token = getToken()
  eventBus.emit(types.UPDATE_TOKEN, { token })
}, 5000);

function getToken() {
  return (Math.random() * 100000).toString(16).substr(0, 8)
}
