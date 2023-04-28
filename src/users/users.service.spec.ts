import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { BcryptService } from '../services/bcrypt.service'
import { EmailService } from '../services/email.service'
import { getModelToken } from '@nestjs/sequelize'
import { mockUserModel } from './user.mock'
import { User } from './user.model'
import { CreateUserDto } from './dto/create.user.dto'

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

  describe('findOne and findOneByEmail', () => {
    it('should return an user', async () => {
      const user = await service.findOne('1')
      expect(user).toHaveProperty('id', 1)
    })

    it('should return an user searched by email', async () => {
      const user = await service.findOneByEmail('email@email.com')
      expect(user).toHaveProperty('id', 1)
    })

    it('should return null if user is not found', async () => {
      mockUserModel.findOne.mockResolvedValue(null) // Set the mock to return null
      const user = await service.findOne('non-existent-id')
      expect(user).toBeNull()
    })

    it('should return null if user searched by email is not found', async () => {
      mockUserModel.findOne.mockResolvedValue(null) // Set the mock to return null
      const user = await service.findOneByEmail('non-existent-email')
      expect(user).toBeNull()
    })
  })

  describe('create', () => {
    it('should return an user created', async () => {
      const data: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'email@email.com',
        document: '12345678',
        password: 'secret',
        role: 'user',
      }

      const user = await service.create(data)
      expect(user).toHaveProperty('email', 'email@email.com')
    })
    it('should return null if user exists', async () => {
      const data: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'email@email.com',
        document: '12345678',
        password: 'secret',
        role: 'user',
      }

      mockUserModel.findOne.mockResolvedValue(data) // set the mocck to return client
      const user = await service.create(data)
      expect(user).toBeNull()
    })
  })
})
