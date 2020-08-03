import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { User } from './user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { TaskResult } from './task-result.enum';
import { Tasklist } from './tasklist.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository
  ) { }

  async find(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findTasksForUser(userId: number): Promise<Task[]> {
    const user = new User();
    user.id = userId;
    return this.taskRepository.find({ owner: user });
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    let task = await this.taskRepository.create(createTaskDto);
    task.dateCreated = new Date();
    task.status = TaskStatus.NEW;
    task.result = TaskResult.NOT_STARTED;
    const owner = new User();
    owner.id = createTaskDto.ownerId;
    task.owner = owner;
    const tasklist = new Tasklist();
    tasklist.id = createTaskDto.tasklistId;
    task.tasklist = tasklist;
    task = await this.taskRepository.save(task);
    console.log("new task", task);
    return task;
  }

}
