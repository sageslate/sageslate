import { setContext } from '@apollo/client/link/context'

import { useAuthenticationStore } from '@/stores/authentication'

export const authenticationLink = setContext((_, { headers }) => {
  const authenticationStore = useAuthenticationStore()

  return {
    headers: {
      ...(headers as Record<string, string> | undefined),
      authorization: authenticationStore.token ? `Bearer ${authenticationStore.token}` : undefined,
    },
  }
})
