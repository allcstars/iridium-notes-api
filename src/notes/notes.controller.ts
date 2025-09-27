import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  allNotes(@CurrentUser('sub') userId: string) {
    return this.notesService.findAll(userId);
  }

  @Get(':id')
  findNote(@CurrentUser('sub') userId: string, @Param('id') id: string) {
    return this.notesService.findById(userId, id);
  }

  @Post()
  createNote(
    @CurrentUser('sub') userId: string,
    @Body()
    createNoteDto: CreateNoteDto,
  ) {
    return this.notesService.create(userId, createNoteDto);
  }

  @Patch(':id')
  updateNote(
    @CurrentUser('sub') userId: string,
    @Param('id') id: string,
    @Body()
    updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(userId, id, updateNoteDto);
  }

  @Delete(':id')
  deleteNote(@CurrentUser('sub') userId: string, @Param('id') id: string) {
    return this.notesService.delete(userId, id);
  }
}
