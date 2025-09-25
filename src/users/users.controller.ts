import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('info')
  async getInfo(@CurrentUser('sub') id: string) {
    return this.usersService.findById(id);
  }

  @Post('info')
  async updateInfo(
    @CurrentUser('sub')
    id: string,
    email?: string,
    password?: string,
    name?: string,
  ) {
    return this.usersService.update(id, name, email, password);
  }
}
