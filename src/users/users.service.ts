import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from './user.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/create.user.dto'
import { BcryptService } from 'src/services/bcrypt.service'

@Injectable()
export class UsersService {
  constructor(
    private bcryptService: BcryptService,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  findAll(): Promise<User[]> {
    return this.userModel.scope('withoutPassword').findAll()
  }

  findOne(id: string): Promise<User> {
    return this.userModel.scope('withoutPassword').findOne({
      where: {
        id,
      },
    })
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
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
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
    console.log(user)
    return user
  }
}
