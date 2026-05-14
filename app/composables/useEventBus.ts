const eventBusKey = Symbol('event-bus')

export function provideEventBus() {
  const listeners: Record<string, Set<Function>> = {}

  const bus: EventBus = {
    emit(name, payload) {
      ;(listeners[name] || []).forEach((fn) => fn(payload))
    },
    on(name, fn) {
      ;(listeners[name] ??= new Set()).add(fn)
    },
    off(name, fn) {
      listeners[name]?.delete(fn)
    },
  }

  provide(eventBusKey, bus)
}

export function useEventBus(): EventBus {
  const bus = inject<EventBus>(eventBusKey)
  if (!bus) {
    throw new Error('EventBus has not been provided. Did you forget to call provideEventBus()?')
  }
  return bus
}

export interface EventBus {
  /** Emit an event to every listener */
  emit(name: string, payload?: any): void
  /** Register a listener */
  on(name: string, cb: (payload: any) => void): void
  /** Remove a listener */
  off(name: string, cb: (payload: any) => void): void
}
