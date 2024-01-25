import { setContext } from '@apollo/client/link/context'
import { getActivePinia } from 'pinia'

import { useAuthenticationStore } from '@/stores/authentication'

export const authenticationLink = setContext((_, context) => {
  if (!getActivePinia()) {
    return context
  }

  const authenticationStore = useAuthenticationStore()

  return {
    ...context,
    headers: {
      ...(context.headers as Record<string, string> | undefined),
      authorization: authenticationStore.token ? `Bearer ${authenticationStore.token}` : undefined,
    },
  }
})
