import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (!type || !token || type.toLowerCase() !== 'bearer') {
      throw new UnauthorizedException('Invalid authorization header');
    }

    try {
      const payload: { payload: string } = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET_KEY,
        },
      );

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    return true;
  }
}
