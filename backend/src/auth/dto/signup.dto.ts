import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Mariam', minLength: 3 })
  @IsString()
  @MinLength(3)
  name!: string;

  @ApiProperty({
  example: 'P@ssw0rd!',
  description: '8+ chars; includes letter, number, special char',
  pattern: '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$',
  })
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
    message: 'Password must be 8+ chars and include a letter, number, and special char'
  })
  password!: string;
}
