// src/application/users/use-cases/create-user.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TokenServicePort } from 'src/domain/tokens/ports/token-service.port';
import { UserServicePort } from 'src/domain/users/ports/user-service.port';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserServicePort') private readonly userService: UserServicePort,
    @Inject('TokenServicePort') private readonly tokenService: TokenServicePort,
  ) {}

  async execute(email: string, password: string, contactId: string, phoneNumber: string) {
    console.log(this.tokenService); // Debe mostrar el objeto con los métodos del adaptador

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.createUser({ email, password: hashedPassword, contactId });
    await this.tokenService.generateToken(user.id, phoneNumber);  
    return user;
  
  }

}
