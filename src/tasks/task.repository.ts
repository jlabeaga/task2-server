import { Repository, EntityRepository, getRepository, getManager } from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  test() {
    return null;
  }

  async findTasksForUser(userId: number): Promise<Task[]> {
    const user = new User();
    user.id = userId;
    console.log("user", user);
    const result = await getManager()
      .createQueryBuilder()
      .select("task")
      .from(Task, "task")
      .where("task.owner_id = :userId", { userId })
      .innerJoinAndSelect("task.tasklist", "tasklist")
      .getMany();

    return result;
  }

}