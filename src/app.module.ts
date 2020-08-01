import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.confg';
import { UsersModule } from './users/users.module';
import { UserService } from './users/user.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsersModule,
    TasksModule
  ],
  providers: [UserService],
})
export class AppModule { }
