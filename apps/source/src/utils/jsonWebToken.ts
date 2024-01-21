import { SignJWT, jwtVerify } from 'jose'

import type { Simplify } from 'type-fest'

const alg = 'HS256'

const issuer = 'sage:source'
const audience = 'sage:sight'

export type JWTPayload = {
  roles: string[]
}

export async function createToken(secret: string, payload: JWTPayload) {
  const encodedSecret = new TextEncoder().encode(secret)

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime('12h')
    .sign(encodedSecret)

  return jwt
}

export async function verifyToken(secret: string, token: string) {
  const encodedSecret = new TextEncoder().encode(secret)

  try {
    const { payload } = await jwtVerify<JWTPayload>(token, encodedSecret, {
      algorithms: [alg],
      issuer,
      audience,
      requiredClaims: ['roles'],
    })
    return payload
  } catch {
    return
  }
}

export type UserInfo = Simplify<NonNullable<Awaited<ReturnType<typeof verifyToken>>>>
