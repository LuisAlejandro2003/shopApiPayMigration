// src/infrastructure/notifications/dtos/create-notification.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  sid?: string;

  @IsOptional()
  dateSent?: Date;

  @IsOptional()
  @IsString()
  error?: string;
}
