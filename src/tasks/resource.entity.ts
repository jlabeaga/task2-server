import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Tasklist } from './tasklist.entity';

@Entity()
export class Resource extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  ref: string;

  @Column()
  isglobal: boolean;

  @ManyToOne(type => Tasklist)
  tasklist: Tasklist;

}