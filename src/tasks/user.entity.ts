import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, ManyToMany, JoinTable } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from './role.enum';
import { Exclude } from 'class-transformer';
import { Tasklist } from './tasklist.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @Column()
  active: boolean;

  @Column()
  role: Role;

  @ManyToMany(type => Tasklist, tasklist => tasklist.participants)
  tasklists: Tasklist[];

  validatePassword(password: string): boolean {
    const hash = bcrypt.hashSync(password, this.salt);
    return hash === this.password;
  }

}