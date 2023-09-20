import { UnauthorizedException } from '@nestjs/common';

export function extractJwtToken(authorizationHeader: string): string {
  if (!authorizationHeader) {
    throw new UnauthorizedException('Authorization header missing');
  }

  const jwtToken = authorizationHeader.replace('Bearer ', '');

  return jwtToken;
}
