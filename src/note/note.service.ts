import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly NoteRepository: Repository<Note>,
  ) {}
  create(createNoteDto: CreateNoteDto) {
    const parse = createNoteDto.noteTo.replace(' ', '');
    createNoteDto.noteTo = parse;
    console.log(createNoteDto);
    return this.NoteRepository.save(createNoteDto);
  }

  findPostBySchoolNum(noteTo) {
    console.log(noteTo);
    return this.NoteRepository.find({
      where: { noteTo },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
