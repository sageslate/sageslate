import { asErrorCode, isObject, ErrorCode } from '@sageslate/stone'

export function extractErrorCode(error: unknown): ErrorCode | ErrorCode[] {
  if (isObject(error)) {
    if (
      'extensions' in error &&
      isObject(error.extensions) &&
      'code' in error.extensions &&
      error.extensions.code === 'INTERNAL_SERVER_ERROR' &&
      'exception' in error.extensions &&
      isObject(error.extensions.exception) &&
      'name' in error.extensions.exception &&
      error.extensions.exception.name === 'ZodError' &&
      'issues' in error.extensions.exception &&
      Array.isArray(error.extensions.exception.issues)
    ) {
      return error.extensions.exception.issues.flatMap(issue => extractErrorCode(issue))
    }

    if ('message' in error) {
      return asErrorCode(error.message)
    }
  }

  return ErrorCode.UnknownError
}
