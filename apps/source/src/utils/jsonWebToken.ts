import { SignJWT, jwtVerify } from 'jose'

const alg = 'HS256'

const issuer = 'sage:source'
const audience = 'sage:sight'

export async function createAdminToken(secret: string) {
  const encodedSecret = new TextEncoder().encode(secret)

  const jwt = await new SignJWT({ roles: ['admin'] })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime('2h')
    .sign(encodedSecret)

  return jwt
}

export async function verifyAdminToken(token: string, secret: string) {
  const encodedSecret = new TextEncoder().encode(secret)

  try {
    const { payload } = await jwtVerify<{ roles: string[] }>(token, encodedSecret, {
      algorithms: [alg],
      issuer,
      audience,
    })
    return payload.roles.includes('admin')
  } catch {
    return false
  }
}
