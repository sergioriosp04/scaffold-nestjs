import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password)

    if (!user) {
      throw new BadRequestException('Password or email are incorrect')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw new BadRequestException('Password or email are incorrect')
    }

    return user
  }
}
