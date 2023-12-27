import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Like, QueryFailedError, Repository } from 'typeorm';
import { parseDate } from 'src/function/parseDate';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly BoardRepository: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<boolean> {
    try {
      this.BoardRepository.save(createBoardDto);
      return true;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    const data = this.BoardRepository.find({
      select: ['boardId', 'thumbnail', 'title', 'writer', 'createdAt', 'price'],
    });
    const parsedData = parseDate(data);
    return parsedData;
  }

  async findOne(boardId: number) {
    const data = this.BoardRepository.findOne({
      select: [
        'boardId',
        'thumbnail',
        'title',
        'writer',
        'price',
        'info',
        'deal',
      ],
      where: { boardId },
    });
    return data;
  }

  async findRental() {
    const data = this.BoardRepository.find({
      select: ['boardId', 'thumbnail', 'title', 'writer', 'createdAt', 'price'],
      where: { type: 'rental' },
    });
    const parsedData = parseDate(data);
    return parsedData;
  }

  async findSell() {
    const data = this.BoardRepository.find({
      select: ['boardId', 'thumbnail', 'title', 'writer', 'createdAt', 'price'],
      where: { type: 'sell' },
    });
    const parsedData = parseDate(data);
    return parsedData;
  }

  async searchOne(title: string) {
    console.log(title);
    const data = await this.BoardRepository.find({
      select: ['boardId', 'thumbnail', 'title', 'writer', 'createdAt', 'price'],
      where: {
        title: Like(`%${title}%`),
      },
    });
    return data;
  }
  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
