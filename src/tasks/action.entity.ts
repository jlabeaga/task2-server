import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from '../users/user.entity';
import { Task } from './task.entity';

@Entity()
export class Action extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(type => Task, task => task.actions)
  task: Task;

  @ManyToOne(type => User)
  contributor: User;

  @Column()
  dateCreated: Date;

  @Column()
  hours: number;

}