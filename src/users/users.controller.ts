import {
  Controller,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Post, Get, Body, Param, UseGuards } from '@nestjs/common/decorators'
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CreateUserDto } from './dto/create.user.dto'
import { ApiResponse } from '@nestjs/swagger'

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id)
    if (!user) {
      throw new NotFoundException('not user found')
    }

    return user
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto)

    if (!user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }

    return user
  }
}
