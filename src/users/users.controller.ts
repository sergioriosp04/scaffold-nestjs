import { Controller, NotFoundException } from '@nestjs/common'
import { Post, Get, Body, Param, UseGuards } from '@nestjs/common/decorators'
import { UsersService } from './users.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateUserDto } from './dto/create.user.dto'

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
  async create(@Body() CreateUserDto: CreateUserDto) {
    return CreateUserDto
  }
}
