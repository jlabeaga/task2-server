import { Controller, Get, UseInterceptors, ClassSerializerInterceptor, Param, Delete, Patch, Body, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller()
export class UsersController {

  constructor(private userService: UserService) { }

  @Get('users')
  @UseInterceptors(ClassSerializerInterceptor)
  async find(): Promise<User[]> {
    return this.userService.find();
  }

  @Get('admin/users/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getUserProfile(@Param('id') id: number): Promise<User> {
    return this.userService.getUserProfile(id);
  }

  @Delete('admin/users/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async disableUser(@Param('id') id: number): Promise<User> {
    return this.userService.disableUser(id);
  }

  @Patch('admin/users/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async updateUser(@Param('id') id: number, @Body() body): Promise<User> {
    return this.userService.updateUser(id, body);
  }

  @Post('admin/users/:userId/tasklist/:tasklistId')
  @UseInterceptors(ClassSerializerInterceptor)
  async addUserToTasklist(
    @Param('userId') userId: number,
    @Param('tasklistId') tasklistId: number
  ): Promise<User> {
    return this.userService.addUserToTasklist(userId, tasklistId);
  }

  @Delete('admin/users/:userId/tasklist/:tasklistId')
  @UseInterceptors(ClassSerializerInterceptor)
  async removeUserFromTasklist(
    @Param('userId') userId: number,
    @Param('tasklistId') tasklistId: number
  ): Promise<User> {
    return this.userService.removeUserFromTasklist(userId, tasklistId);
  }

}
