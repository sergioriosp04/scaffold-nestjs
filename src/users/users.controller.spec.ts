import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { EmailService } from '../services/email.service'
import { BcryptService } from '../services/bcrypt.service'
import { UsersService } from './users.service'
import { getModelToken } from '@nestjs/sequelize'
import { User } from './user.model'
import { mockUserModel } from './user.mock'
import { NotFoundException } from '@nestjs/common'

describe('UsersController', () => {
  let controller: UsersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        EmailService,
        BcryptService,
        UsersService,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
      ],
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('findOne', () => {
    it('should return an user', async () => {
      const response = await controller.findOne('1')
      expect(response).toHaveProperty('id', 1)
    })
    it('should return NotFoundException if user not exists', async () => {
      mockUserModel.findOne.mockResolvedValue(null)
      try {
        await controller.findOne('non-existent-id')
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })
})
