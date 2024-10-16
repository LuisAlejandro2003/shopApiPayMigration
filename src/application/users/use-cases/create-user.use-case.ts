// src/application/users/use-cases/create-user.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserServicePort } from 'src/domain/users/ports/user-service.port';
import { TokenServicePort } from 'src/domain/tokens/ports/token-service.port';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserServicePort') private readonly userService: UserServicePort,
    @Inject('TokenServicePort') private readonly tokenService: TokenServicePort,
  ) {}

  async execute(password: string, contactId: string, phoneNumber: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.createUser({ password: hashedPassword, contactId });
    await this.tokenService.generateToken(user.id, phoneNumber);
  }
}
