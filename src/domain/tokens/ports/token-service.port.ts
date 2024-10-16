// src/domain/tokens/ports/token-service.port.ts
import { Token } from '../entities/token.entity';

export interface TokenServicePort {
  generateToken(userId: string, phoneNumber: string): Promise<void>;
  findByValue(value: string): Promise<Token | null>;
  invalidateToken(id: string): Promise<void>;
}
