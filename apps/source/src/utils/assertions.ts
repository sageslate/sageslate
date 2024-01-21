import { Errors } from '@sageslate/stone'

import type { UserInfo } from './jsonWebToken.js'

export function assertIsAdmin(user?: UserInfo): asserts user is UserInfo {
  if (!user?.roles.includes('admin')) {
    throw new Errors.Unauthorized()
  }
}
