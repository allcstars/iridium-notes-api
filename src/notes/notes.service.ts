import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, title: string, content: string) {
    return this.prisma.note.create({ data: { userId, title, content } });
  }

  async update(userId: string, id: string, title?: string, content?: string) {
    const note = await this.prisma.note.findUnique({ where: { id } });

    if (!note || note.userId !== userId) {
      throw new NotFoundException('Note not found');
    }

    return this.prisma.note.update({ where: { id }, data: { title, content } });
  }

  async findById(userId: string, id: string) {
    const note = await this.prisma.note.findUnique({ where: { id } });

    if (!note || note.userId !== userId)
      throw new NotFoundException('Note not found');

    return note;
  }

  async findAll(userId: string) {
    return this.prisma.note.findMany({ where: { userId } });
  }

  async delete(userId: string, id: string) {
    const note = await this.prisma.note.findUnique({ where: { id } });

    if (!note || note.userId !== userId)
      throw new NotFoundException('Note not found');

    return this.prisma.note.delete({ where: { id } });
  }
}
