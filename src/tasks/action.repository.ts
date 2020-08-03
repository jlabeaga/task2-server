import { Repository, EntityRepository } from 'typeorm';
import { Action } from './action.entity';

@EntityRepository(Action)
export class ActionRepository extends Repository<Action> {

  test() {
    return null;
  }

}