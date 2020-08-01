import { Injectable } from '@nestjs/common';
import { Group } from './group.entity';
import { GroupRepository } from './group.repository';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {

  constructor(private groupRepository: GroupRepository) { }

  async find(): Promise<Group[]> {
    console.log("service find");
    return this.groupRepository.find();
  }

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    console.log("group repository create", createGroupDto);
    // return this.groupRepository.save(group);
    // const result = await this.groupRepository.find();
    // return result[0];
    const groupEntity = this.groupRepository.create(createGroupDto);
    return this.groupRepository.save(groupEntity);

  }
}
