import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  noteId: number;

  @Column()
  noteTitle: string;

  @Column()
  noteTo: string;

  @Column({ length: 300 })
  info: string;

  @Column()
  writer: string;

  @CreateDateColumn()
  createdAt: Date;
}
