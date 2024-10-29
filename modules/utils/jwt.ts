import { createRemoteJWKSet, decodeJwt, JWTPayload, jwtVerify } from 'https://deno.land/x/jose@v5.2.4/index.ts';
import { UnauthorizedError } from '../../modules/errors/common_error.ts';
import { AsyncResult, Result } from '../../modules/types/result.ts';

export async function jwtVerifySignature(token: string, url: string, audience: string): AsyncResult<undefined> {
  try {
    await jwtVerify(token, createRemoteJWKSet(new URL(`${url}/oidc/jwks`)), {
      issuer: `${url}/oidc`,
      audience,
    });
  } catch (e) {
    const err = UnauthorizedError();
    err.internal = {
      message: `Error validating JWT Token (${token}) - ${e.message}`,
    };
    return err;
  }
}

export function jwtDecode(token: string): Result<JWTPayload & { tenantId: string; scope: string }> {
  try {
    const claims = decodeJwt(token) as JWTPayload & { tenantId: string; scope: string };
    if (!claims.tenantId) {
      const err = UnauthorizedError();
      err.message = 'Missing tenantId';
      return err;
    }
    return claims;
  } catch (e) {
    const err = UnauthorizedError();
    err.internal = {
      message: `Error validating JWT Token (${token}) - ${e.message}`,
    };
    return err;
  }
}
