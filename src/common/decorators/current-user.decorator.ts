import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

interface CurrentUserData {
  sub: string;
  email: string;
}

export const CurrentUser = createParamDecorator(
  (field: keyof CurrentUserData | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();

    const user: CurrentUserData | undefined = request[
      'user'
    ] as CurrentUserData;

    return field ? user?.[field] : user;
  },
);
