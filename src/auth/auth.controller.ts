import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() name: string, email: string, password: string) {
    return this.authService.signUp(name, email, password);
  }

  @Post('signin')
  async signIn(@Body() email: string, password: string) {
    return this.authService.signIn(email, password);
  }
}
