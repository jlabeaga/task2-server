import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TasklistRepository } from './tasklist.repository';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(TasklistRepository) private tasklistRepository: TasklistRepository
  ) { }

  async find(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserProfile(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id, { relations: ["tasklists"] });
    return user;
  }

  async disableUser(id: number): Promise<User> {
    let user = await this.userRepository.findOne(id);
    user.active = false;
    user = await this.userRepository.save(user);
    return user;
  }

  async updateUser(id: number, update: Partial<User>): Promise<User> {
    let user = await this.userRepository.findOne(id);
    user = await this.userRepository.merge(user, update);
    user = await this.userRepository.save(user);
    return user;
  }

  async addUserToTasklist(userId: number, tasklistId: number): Promise<User> {
    let user = await this.userRepository.findOne(userId, { relations: ["tasklists"] });
    const tasklist = await this.tasklistRepository.findOne(tasklistId);
    user.tasklists.push(tasklist);
    user = await this.userRepository.save(user);
    return user;
  }

  async removeUserFromTasklist(userId: number, tasklistId: number): Promise<User> {
    let user = await this.userRepository.findOne(userId, { relations: ["tasklists"] });
    user.tasklists = user.tasklists.filter(tasklist => tasklist.id != tasklistId);
    user = await this.userRepository.save(user);
    return user;
  }

}
