import { inject } from 'vue'

import type { InjectionKey } from 'vue'

export function strictInject<T>(key: InjectionKey<T> | string): T {
  const resolved = inject(key)

  if (resolved === undefined) {
    throw new Error(`Could not resolve ${typeof key === 'string' ? key : key.description} in context`)
  }

  return resolved
}
