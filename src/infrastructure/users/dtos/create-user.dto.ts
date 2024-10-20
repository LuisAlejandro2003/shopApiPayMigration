// src/infrastructure/users/dtos/create-user.dto.ts
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  contactId: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
