import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './user.model'
import { UsersController } from './users.controller'
import { BcryptService } from 'src/services/bcrypt.service'

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService, BcryptService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
