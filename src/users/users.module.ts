import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { GroupService } from './group.service';
import { UserService } from './user.service';
import { GroupRepository } from './group.repository';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.confg';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      GroupRepository
    ])],
  controllers: [UsersController, GroupsController],
  providers: [UserService, GroupService]
})
export class UsersModule { }
