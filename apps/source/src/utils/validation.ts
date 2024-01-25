import { ErrorCode } from '@sageslate/stone'
import { z } from 'zod'

export const rules = {
  realmName: z.string().min(3, ErrorCode.ValidationNameTooShort).max(100, ErrorCode.ValidationNameTooLong),
  objectId: z.string().regex(/^[\da-f]{24}$/, ErrorCode.ValidationObjectIdInvalid),
  password: z.string().min(4, ErrorCode.ValidationPasswordTooShort),
}
