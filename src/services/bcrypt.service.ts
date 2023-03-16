import { Injectable } from '@nestjs/common/decorators'
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptService {
  async hasPassword(password: string): Promise<string> {
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    const match = await bcrypt.compare(password, hash)
    return match
  }
}
