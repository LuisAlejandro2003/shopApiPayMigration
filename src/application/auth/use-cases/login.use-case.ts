// src/application/auth/use-cases/login.use-case.ts
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { UserServicePort } from 'src/domain/users/ports/user-service.port';
import { compare } from 'bcrypt';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('UserServicePort') private readonly userService: UserServicePort
  ) {}

  async execute(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.verifiedAt) {
      throw new UnauthorizedException('Account is not verified');
    }

    return { message: 'Login successful', userId: user.id };
  }
}
