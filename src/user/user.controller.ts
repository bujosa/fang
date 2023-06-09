import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
}
