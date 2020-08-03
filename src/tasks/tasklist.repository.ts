import { Repository, EntityRepository, getManager } from 'typeorm';
import { Tasklist } from './tasklist.entity';
import { User } from './user.entity';
import { Get } from '@nestjs/common';

@EntityRepository(Tasklist)
export class TasklistRepository extends Repository<Tasklist> {

  test(): string {
    const result = getManager()
      .createQueryBuilder()
      .select("tasklist")
      .from(Tasklist, "tasklist")
      .getQuery();
    // .where("user.name = :name", { name: "John" })
    // .getMany();
    return result;
  }

}