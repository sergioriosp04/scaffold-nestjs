import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { getModelToken } from '@nestjs/sequelize'
import { User } from '../users/user.model'
import { mockUserModel } from '../users/user.mock'
import { AuthService } from './auth.service'
import { EmailService } from '../services/email.service'
import { BcryptService } from '../services/bcrypt.service'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        EmailService,
        JwtService,
        BcryptService,
        UsersService,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
      ],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
