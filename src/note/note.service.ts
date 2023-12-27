import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { Board } from 'src/board/entities/board.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly NoteRepository: Repository<Note>,
    @InjectRepository(Board)
    private readonly BoardRepository: Repository<Board>,
  ) {}
  async create(createNoteDto: CreateNoteDto) {
    const parse = createNoteDto.noteTo.replace(' ', '');
    createNoteDto.noteTo = parse;
    const boardId = createNoteDto.boardId;
    const boardTitle = this.BoardRepository.findOne({
      select: ['title'],
      where: { boardId },
    });
    if ((await boardTitle) === null) {
      return false;
    }

    createNoteDto.boardTitle = (await boardTitle).title;
    return this.NoteRepository.save(createNoteDto);
  }

  findPostBySchoolNum(noteTo) {
    return this.NoteRepository.find({
      where: { noteTo },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  remove(noteId: number) {
    return this.NoteRepository.delete({ noteId });
  }
}
