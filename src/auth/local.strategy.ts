import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, BadRequestException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { BcryptService } from 'src/services/bcrypt.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private bcryptService: BcryptService,
  ) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password)

    if (!user) {
      throw new BadRequestException('Password or email are incorrect')
    }

    const isMatch = await this.bcryptService.comparePasswords(
      password,
      user.password,
    )

    if (!isMatch) {
      throw new BadRequestException('Password or email are incorrect')
    }

    return user
  }
}
