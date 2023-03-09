import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(5)
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsEmail()
  email: string

  @IsNotEmpty()
  document: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  role: string
}
