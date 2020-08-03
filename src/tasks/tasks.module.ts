import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasklistsController } from './tasklists.controller';
import { TaskService } from './task.service';
import { TasklistService } from './tasklist.service';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import * as config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasklistRepository } from './tasklist.repository';
import { TaskRepository } from './task.repository';
import { ActionRepository } from './action.repository';
import { ResourceRepository } from './resource.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ActionsController } from './actions.controller';
import { ResourcesController } from './resources.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { TestController } from './test.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TasklistRepository,
      TaskRepository,
      ActionRepository,
      ResourceRepository,
      UserRepository,
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || config.get("jwt.secret"),
      signOptions: {
        expiresIn: config.get("jwt.expiresIn")
      }
    })
  ],
  controllers: [
    TasksController,
    TasklistsController,
    ActionsController,
    ResourcesController,
    UsersController,
    TestController
  ],
  providers: [
    TaskService,
    TasklistService,
    UserService,
    AuthService,
    JwtStrategy
  ]
})
export class TasksModule { }
