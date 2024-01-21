import { pascalCase } from 'change-case'
import { GraphQLError } from 'graphql'

import type { PascalCase, Simplify, UnionToIntersection, ValueOf } from 'type-fest'

const errorCodes = [
  'APP_ALREADY_INITIALIZED',
  'APP_NOT_INITIALIZED',
  'INVALID_PASSWORD',
  'NETWORK_ERROR',
  'UNAUTHORIZED',
  'UNKNOWN_ERROR',
  'VALIDATION_FOLDER_NAME_ALREADY_EXISTS',
  'VALIDATION_FOLDER_NAME_INVALID',
  'VALIDATION_FOLDER_NAME_TOO_LONG',
  'VALIDATION_FOLDER_NAME_TOO_SHORT',
  'VALIDATION_NAME_TOO_LONG',
  'VALIDATION_NAME_TOO_SHORT',
  'VALIDATION_OBJECT_ID_INVALID',
  'VALIDATION_PASSWORD_TOO_SHORT',
] as const

export type ErrorCode = ValueOf<typeof errorCodes, number>
export const ErrorCode = Object.fromEntries(errorCodes.map(key => [pascalCase(key), key])) as unknown as Simplify<
  UnionToIntersection<
    {
      [key in ErrorCode]: {
        readonly [K in PascalCase<key>]: key
      }
    }[ErrorCode]
  >
>

type ErrorClass = new () => GraphQLError

export const Errors = Object.fromEntries(
  errorCodes.map(key => [
    pascalCase(key),
    class extends GraphQLError {
      constructor() {
        super(key, {
          extensions: {
            code: key,
          },
        })
      }
    },
  ]),
) as unknown as {
  readonly [key in PascalCase<ErrorCode>]: ErrorClass
}

export function asErrorCode(value: unknown): ErrorCode {
  if (errorCodes.includes(value as ErrorCode)) {
    return value as ErrorCode
  }

  return ErrorCode.UnknownError
}
