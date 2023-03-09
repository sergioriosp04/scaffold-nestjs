import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(5)
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

  @IsNotEmpty()
  @ApiProperty()
  document: string

  @IsNotEmpty()
  @ApiProperty()
  password: string

  @IsNotEmpty()
  @ApiProperty()
  role: string
}
