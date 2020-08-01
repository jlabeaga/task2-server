import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Task } from './task.entity';
import { User } from '../users/user.entity';
import { Group } from '../users/group.entity';

@Entity()
@Unique(['name'])
export class Tasklist extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  description: string;

  @OneToMany(type => Task, task => task.tasklist)
  tasks: Task[];

  @ManyToMany(type => Group, group => group.tasklists)
  @JoinTable()
  participants: Group[];

}