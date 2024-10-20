// src/application/users/use-cases/create-user.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserServicePort } from 'src/domain/users/ports/user-service.port';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserServicePort') private readonly userService: UserServicePort,
  
  ) {}

  async execute(email: string, password: string, contactId: string, phoneNumber: string) {
   

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.createUser({ email, password: hashedPassword, contactId });
   
    return user;
  
  }

}