import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const passwordHash = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: { name, email, password: passwordHash },
      omit: { password: true },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { name, email, password } = updateUserDto;

    let passwordHash: string | undefined;

    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: { name, email, password: passwordHash },
      omit: { password: true },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
  }

  delete(id: string) {
    return this.prisma.user.delete({ where: { id }, omit: { password: true } });
  }
}
