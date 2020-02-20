import { EventBus } from './EventBus'
import types from './types'

function createInstance() {
  const bus = new EventBus()
  return bus
}

const bus = createInstance()

bus.create = function create() {
  return createInstance()
}

export default bus

export { types }
