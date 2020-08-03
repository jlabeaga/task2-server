import { Controller, Get, UseGuards, Query, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TasklistService } from './tasklist.service';
import { Tasklist } from './tasklist.entity';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from './user.entity';

@ApiTags('tasks')
@Controller()
export class TasksController {

  constructor(
    private taskService: TaskService
  ) { }

  @Get('admin/tasks')
  async findTasksForUser(@Query('userId') userId): Promise<Task[]> {
    console.log("userId", userId);
    if (userId) {
      return this.taskService.findTasksForUser(userId);
    }
    console.log("findAll");
    return this.taskService.find();
  }

  @Get('tasks')
  @UseGuards(AuthGuard())
  async findTasksForMe(@GetUser() user): Promise<Task[]> {
    return this.taskService.findTasksForUser(user.id);
  }

  @Post('tasks')
  async create(
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }


}
