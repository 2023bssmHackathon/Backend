import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  thumbnail: string;

  @IsNotEmpty({ message: '제목이 비었습니다.' })
  title: string;

  @IsNotEmpty({ message: '작성자가 비었습니다.' })
  writer: string;

  @IsNotEmpty({ message: '가격이 비었습니다.' })
  price: number;

  @IsNotEmpty({ message: '설명이 비었습니다.' })
  info: string;

  @IsNotEmpty({ message: '거래시간&장소가 비었습니다.' })
  deal: string;

  @IsNotEmpty({ message: '대여/판매 여부가 비었습니다.' })
  type: string;
}
