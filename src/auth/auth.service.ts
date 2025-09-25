import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(name: string, email: string, password: string) {
    const user = await this.usersService.create(name, email, password);

    return user;
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    const isPasswordValid = !user
      ? false
      : await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Invalid user or password');
    }

    const payload = { sub: user.id, email: user.email };

    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
