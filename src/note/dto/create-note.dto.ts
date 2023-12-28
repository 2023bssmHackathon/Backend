import { IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  boardId: number;

  boardTitle: string;

  @IsNotEmpty({ message: '보낼 상대가 비었습니다.' })
  noteTo: string;

  @IsNotEmpty({ message: '내용이 비었습니다.' })
  info: string;

  @IsNotEmpty({ message: '작성자가 비었습니다.' })
  writer: string;
}
