import { Controller, HttpStatus, NotFoundException } from '@nestjs/common';
import { Get, HttpCode, Param, Res } from '@nestjs/common/decorators';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  @HttpCode(404)
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id)
    if (!user) {
      throw new NotFoundException('not user found')
    }
    
    return user
  }
}
