import { Controller, Delete, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('info')
  async getInfo(@CurrentUser('sub') id: string) {
    return this.usersService.findById(id);
  }

  @Patch('info')
  async updateInfo(
    @CurrentUser('sub')
    id: string,
    email?: string,
    password?: string,
    name?: string,
  ) {
    return this.usersService.update(id, name, email, password);
  }

  @Delete()
  async deleteUser(@CurrentUser('sub') id: string) {
    return this.usersService.delete(id);
  }
}
