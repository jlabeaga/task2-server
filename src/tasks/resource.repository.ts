import { Repository, EntityRepository } from 'typeorm';
import { Resource } from './resource.entity';

@EntityRepository(Resource)
export class ResourceRepository extends Repository<Resource> {

  test() {
    return null;
  }

}