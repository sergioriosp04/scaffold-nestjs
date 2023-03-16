import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({
    minimum: 5,
  })
  firstName: string

  @IsNotEmpty()
  @ApiProperty()
  lastName: string

  @IsEmail()
  @ApiProperty()
  email: string

  @ApiProperty()
  document: string

  @IsNotEmpty()
  @ApiProperty()
  password: string

  @ApiProperty()
  role: string
}
