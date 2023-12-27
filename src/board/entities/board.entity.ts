import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  boardId: number;

  @Column({ nullable: true })
  thumbnail: string;

  @Column()
  title: string;

  @Column()
  writer: string;

  @Column()
  price: number;

  @Column()
  type: string;

  @Column({ length: 1000 })
  info: string;

  @Column()
  deal: string;

  @CreateDateColumn()
  createdAt: string;
}
