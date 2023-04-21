import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { BcryptService } from '../services/bcrypt.service'
import { EmailService } from '../services/email.service'
import { getModelToken } from '@nestjs/sequelize'
import { mockUserModel } from './user.mock'
import { User } from './user.model'

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        BcryptService,
        EmailService,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
