import { Injectable } from '@nestjs/common';
import { Tasklist } from './tasklist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTasklistDto } from './dto/create-tasklist.dto';
import { TasklistRepository } from './tasklist.repository';

@Injectable()
export class TasklistService {

  constructor(
    @InjectRepository(TasklistRepository) private tasklistRepository: TasklistRepository
  ) { }

  async find(): Promise<Tasklist[]> {
    return this.tasklistRepository.find();
  }

  async create(createTasklistDto: CreateTasklistDto): Promise<Tasklist> {
    const tasklist = await this.tasklistRepository.save(createTasklistDto);
    console.log("new tasklist", tasklist);
    return tasklist;
  }

}
