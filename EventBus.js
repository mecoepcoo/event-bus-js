export class EventBus {
  _events = []

  _uidCount = 0

  get events() {
    return this._events
  }

  /**
   * 注册/订阅事件
   * @param {string} name 事件名
   * @param {function} execute 执行函数
   */
  register(name, execute) {
    const eventId = this._createUid()
    const events = this._events
    const event = this.findEvent(name)

    if (event !== null) {
      event.executes.push({ id: eventId, execute })
      return eventId
    }

    events.push({
      name,
      executes: [
        {
          id: eventId,
          execute
        }
      ]
    })
    return eventId
  }
  /**
   * 注册事件，触发一次后移除
   * @param {string} name 事件名
   * @param {function} execute 执行函数
   */
  registerOnce(name, execute) {
    const _this = this
    const eventId = this.register(name, handler)
    function handler() {
      _this.unregister(name, eventId)
      execute.apply(null, arguments)
    }
  }
  /**
   * 退订事件
   * @param {string} name 事件名称
   * @param {number} eventId 事件id
   */
  unregister(name, eventId) {
    const events = this._events

    for (const i in events) {
      if (name === events[i].name) {
        if (eventId && events[i].executes.length > 0) {
          const eventIndex = events[i].executes.findIndex(item => item.id === eventId)
          if (eventIndex !== -1) {
            events[i].executes.splice(eventIndex, 1)
          }
        } else {
          events.splice(i, 1)
          return this
        }
      }
    }
    return this
  }
  /**
   * 退订全部事件
   */
  unregisterAll() {
    this._events = []
  }
  /**
   * 发射事件
   * @param {string} name 事件名称
   * @param {any} payload 
   */
  emit(name, payload) {
    const events = this._events

    for (const i in events) {
      if (name === events[i].name) {
        const funcs = events[i].executes
        funcs.forEach((item, i) => {
          item.execute(payload)
        })
        return this
      }
    }
    return this
  }

  findEvent(name) {
    const events = this._events

    for (const i in events) {
      if (name === events[i].name) {
        return events[i]
      }
    }
    return null
  }

  _createUid() {
    this._uidCount++
    return this._uidCount
  }
}
