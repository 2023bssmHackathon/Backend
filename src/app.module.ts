import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BoardModule } from './board/board.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [DatabaseModule, BoardModule, NoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
