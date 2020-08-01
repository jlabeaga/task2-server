import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { Group } from './group.entity';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { of } from 'rxjs';

@Controller('groups')
export class GroupsController {

  constructor(private groupService: GroupService) { }

  @Get()
  find(): Promise<Group[]> {
    console.log("controller find");
    return this.groupService.find();
  }

  @Post()
  create(@Body() group: CreateGroupDto): Promise<Group> {
    return this.groupService.create(group);
  }

}
