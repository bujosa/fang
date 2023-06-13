import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<any> {
    return this.service.getUser(id);
  }

  @Post()
  async createUser(@Body() user: User): Promise<any> {
    return this.service.createUser(user);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: User): Promise<any> {
    return this.service.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    return this.service.deleteUser(id);
  }

  @Get()
  async getAllUsers(): Promise<any> {
    return this.service.getAllUsers();
  }
}
