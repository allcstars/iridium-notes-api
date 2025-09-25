import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('info')
  async getInfo(id: string) {
    return this.usersService.findById(id);
  }

  @Post('info')
  async updateInfo(
    id: string,
    email?: string,
    password?: string,
    name?: string,
  ) {
    return this.usersService.update(id, name, email, password);
  }
}
