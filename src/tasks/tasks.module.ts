import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasklistsController } from './tasklists.controller';
import { TaskService } from './task.service';
import { TasklistService } from './tasklist.service';

@Module({
  controllers: [TasksController, TasklistsController],
  providers: [TaskService, TasklistService]
})
export class TasksModule { }
