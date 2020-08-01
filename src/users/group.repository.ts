import { Repository, EntityRepository } from 'typeorm';
import { Group } from './group.entity';

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {

  test() {
    return null;
  }

  async getEverybodyGroup(): Promise<Group> {
    return (await this.find({ code: Group.EVERYBODY }))[0];
  }
}