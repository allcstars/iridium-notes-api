import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async allNotes(@CurrentUser('sub') userId: string) {
    return this.notesService.findAll(userId);
  }

  @Get(':id')
  async findNote(@CurrentUser('sub') userId: string, @Param('id') id: string) {
    return this.notesService.findById(userId, id);
  }

  @Post()
  async createNote(
    @CurrentUser('sub') userId: string,
    title: string,
    content: string,
  ) {
    return this.notesService.create(userId, title, content);
  }

  @Patch(':id')
  async updateNote(
    @CurrentUser('sub') userId: string,
    @Param('id') id: string,
    title?: string,
    content?: string,
  ) {
    return this.notesService.update(userId, id, title, content);
  }

  @Delete(':id')
  async deleteNote(
    @CurrentUser('sub') userId: string,
    @Param('id') id: string,
  ) {
    return this.notesService.delete(userId, id);
  }
}
