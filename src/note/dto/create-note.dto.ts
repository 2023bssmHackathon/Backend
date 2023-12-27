import { IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty({ message: '게시물 Id가 비었습니다.' })
  boardId: number;

  boardTitle: string;

  @IsNotEmpty({ message: '보낼 상대가 비었습니다.' })
  noteTo: string;

  @IsNotEmpty({ message: '내용이 비었습니다.' })
  info: string;

  @IsNotEmpty({ message: '작성자가 비었습니다.' })
  writer: string;
}
