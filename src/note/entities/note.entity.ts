import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  noteId: number;

  @Column()
  noteTo: string;

  @Column({ length: 300 })
  info: string;

  @Column()
  writer: string;

  @Column()
  createdAt: Date;
}
