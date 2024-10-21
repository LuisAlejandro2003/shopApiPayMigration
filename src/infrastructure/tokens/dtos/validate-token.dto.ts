// src/infrastructure/tokens/dtos/validate-token.dto.ts
import { IsNumberString, Length } from 'class-validator';

export class ValidateTokenDto {
  @IsNumberString({}, { message: 'El token debe contener solo números' })
  @Length(4, 4, { message: 'El token debe tener exactamente 4 dígitos' })
  token: string;
}
