import { pascalCase } from 'change-case'
import { GraphQLError } from 'graphql'

import type { PascalCase, Simplify, UnionToIntersection, ValueOf } from 'type-fest'

const errorCodes = [
  'APP_ALREADY_INITIALIZED',
  'APP_NOT_INITIALIZED',
  'NETWORK_ERROR',
  'PASSWORD_TOO_SHORT',
  'UNKNOWN_ERROR',
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
