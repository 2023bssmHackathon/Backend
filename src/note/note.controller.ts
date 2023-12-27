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
  async create(
    @Body(new ValidationPipe()) createNoteDto: CreateNoteDto,
    @Res() res: Response,
  ) {
    const result = this.noteService.create(createNoteDto);
    if ((await result) === false)
      return res.status(404).send('board not found');
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
  remove(@Param('id') id: string, @Res() res: Response) {
    this.noteService.remove(+id);
    return res.status(200).send({ delete: true });
  }
}
