import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTasklistDto } from './dto/create-tasklist.dto';
import { Tasklist } from './tasklist.entity';
import { TasklistService } from './tasklist.service';

@ApiTags('tasklists')
@Controller()
export class TasklistsController {

  constructor(private tasklistService: TasklistService) { }

  @Get('admin/tasklists')
  async find(): Promise<Tasklist[]> {
    return this.tasklistService.find();
  }

  @Post('admin/tasklists')
  async create(@Body() createTasklistDto: CreateTasklistDto): Promise<Tasklist> {
    return this.tasklistService.create(createTasklistDto);
  }

}
