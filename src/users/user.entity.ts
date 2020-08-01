import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, ManyToMany, JoinTable } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from './role.enum';
import { Group } from './group.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  active: boolean;

  @Column()
  role: Role;

  @ManyToMany(type => Group, group => group.users)
  @JoinTable()
  groups: Group[];

  validatePassword(password: string): boolean {
    const hash = bcrypt.hashSync(password, this.salt);
    return hash === this.password;
  }

}