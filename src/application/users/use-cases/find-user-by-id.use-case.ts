// src/application/users/use-cases/find-user-by-id.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { UserServicePort } from 'src/domain/users/ports/user-service.port';
import { User } from 'src/domain/users/entities/user.entity';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    @Inject('UserServicePort') private readonly userService: UserServicePort
  ) {}

  async execute(userId: string): Promise<User | null> {
    return await this.userService.findUserById(userId);
  }
}
