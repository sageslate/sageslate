import { ErrorCode } from '@sageslate/stone'
import { z } from 'zod'

export const rules = {
  password: z.string().min(4, ErrorCode.PasswordTooShort),
}
