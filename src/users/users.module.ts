import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './user.model'
import { UsersController } from './users.controller'
import { BcryptService } from 'src/services/bcrypt.service'
import { EmailService } from 'src/services/email.service'

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService, BcryptService, EmailService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
