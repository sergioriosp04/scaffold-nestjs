import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from './user.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/create.user.dto'
import { BcryptService } from '../services/bcrypt.service'
import { EmailService } from '../services/email.service'

@Injectable()
export class UsersService {
  constructor(
    private Emailservice: EmailService,
    private bcryptService: BcryptService,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  findAll(): Promise<User[]> {
    return this.userModel.scope('withoutPassword').findAll()
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    delete user.dataValues?.password
    return user
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        email,
      },
    })
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existsUser = await this.userModel.findOne({
      where: {
        email: createUserDto.email,
      },
    })

    if (existsUser) {
      return null
    }

    const passwordHash = await this.bcryptService.hasPassword(
      createUserDto.password,
    )

    const user = await this.userModel.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: passwordHash,
    })

    this.Emailservice.sendEmail(
      createUserDto.email,
      'User register successfully',
      'User register successfully',
    )

    delete user.dataValues?.password
    return user
  }
}
