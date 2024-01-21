import { onError } from '@apollo/client/link/error'
import { ErrorCode, kebabCase } from '@sageslate/stone'

import { extractErrorCode } from '@/atoms/utils/extractErrorCode'
import { useAlertsStore } from '@/stores/alerts'

import type { LocalizedErrorCode } from '@/stores/alerts'
import type { KebabCase } from 'type-fest'

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  const alertsStore = useAlertsStore()

  const errorCodes = new Set<ErrorCode>()

  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      const errorCode = extractErrorCode(error)
      if (Array.isArray(errorCode)) {
        for (const code of errorCode) {
          errorCodes.add(code)
        }
      } else {
        errorCodes.add(errorCode)
      }
    }
  }
  if (networkError) {
    errorCodes.add(ErrorCode.NetworkError)
  }

  for (const code of errorCodes) {
    const kebabCode: LocalizedErrorCode = kebabCase(code) as KebabCase<typeof code>
    alertsStore.error(kebabCode)
  }
})
