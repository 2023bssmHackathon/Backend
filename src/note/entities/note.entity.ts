import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  noteId: number;

  @Column()
  boardId: number;

  @Column()
  writer: string;

  @Column()
  boardTitle: string;

  @Column({ length: 300 })
  info: string;

  @Column()
  noteTo: string;
}
