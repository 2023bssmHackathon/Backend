import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  Res,
  Query,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { Response } from 'express';

@Controller('/api/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(
    @Body(new ValidationPipe()) createNoteDto: CreateNoteDto,
    @Res() res: Response,
  ) {
    this.noteService.create(createNoteDto);
    return res.status(201).send({ create: true });
  }

  @Get('/')
  findAll(@Query('number') number: string) {
    const noSpaceNum = number.replace(' ', '');
    return this.noteService.findPostBySchoolNum(noSpaceNum);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(+id);
  }
}
