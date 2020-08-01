import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, ManyToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from './user.entity';
import { Tasklist } from '../tasks/tasklist.entity';

@Entity()
@Unique(['name'])
export class Group extends BaseEntity {

  static EVERYBODY = "EVERYBODY";

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  description: string;

  @ManyToMany(type => User, user => user.groups)
  users: User[];

  @ManyToMany(type => Tasklist, tasklist => tasklist.participants)
  tasklists: Tasklist[];

}