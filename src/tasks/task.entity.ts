import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from '../users/user.entity';
import { Tasklist } from './tasklist.entity';
import { Action } from './action.entity';
import { TaskStatus } from './task-status.enum';
import { TaskResult } from './task-result.enum';

@Entity()
export class Task extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(type => Tasklist, tasklist => tasklist.tasks)
  tasklist: Tasklist;

  @ManyToOne(type => User)
  owner: User;

  @Column()
  status: TaskStatus;

  @Column()
  result: TaskResult;

  @Column()
  dateCreated: Date;

  @Column()
  hoursEstimated: number;

  @OneToMany(type => Action, action => action.task)
  actions: Action[];

}