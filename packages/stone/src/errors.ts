import { pascalCase } from 'change-case'
import { GraphQLError } from 'graphql'

import type { PascalCase } from 'type-fest'

export const ErrorCode = {
  APP_ALREADY_INITIALIZED: 'APP_ALREADY_INITIALIZED',
} as const
export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode]

type ErrorClass = new () => GraphQLError

export const Errors = Object.fromEntries(
  Object.keys(ErrorCode).map(key => [
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
