import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Res,
  InternalServerErrorException,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller('/api/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename(_, file, callback): void {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(
    @Body(new ValidationPipe()) createBoardDto: CreateBoardDto,
    @UploadedFile() file,
    @Res() res: Response,
  ) {
    if (!file) throw new BadRequestException('no image');
    createBoardDto.thumbnail = file.filename;
    const result = this.boardService.create(createBoardDto);
    if (result) return res.status(201).send({ create: true });

    throw new InternalServerErrorException();
  }

  @Get('/')
  findAll() {
    return this.boardService.findAll();
  }

  @Get('/sell')
  findSell() {
    return this.boardService.findSell();
  }

  @Get('/rental')
  findRental() {
    return this.boardService.findRental();
    //return this.boardService.getByType(type);
  }

  @Get('/search')
  searchBoard(@Query('title') title: string) {
    return this.boardService.searchOne(title);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.boardService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }
}
