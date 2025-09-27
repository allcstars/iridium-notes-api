import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('info')
  getInfo(@CurrentUser('sub') id: string) {
    return this.usersService.findById(id);
  }

  @Patch('info')
  updateInfo(
    @CurrentUser('sub')
    id: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete()
  deleteUser(@CurrentUser('sub') id: string) {
    return this.usersService.delete(id);
  }
}
