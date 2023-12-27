import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { Note } from './entities/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/board/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Board])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
