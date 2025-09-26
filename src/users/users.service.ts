import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(email: string, password: string, name: string) {
    const passwordHash = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: { name, email, password: passwordHash },
      omit: { password: true },
    });
  }

  async update(id: string, email?: string, password?: string, name?: string) {
    let passwordHash = '';

    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: { name, email, password: passwordHash },
      omit: { password: true },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
