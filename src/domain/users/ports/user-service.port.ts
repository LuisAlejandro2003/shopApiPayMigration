// src/domain/users/ports/user-service.port.ts
import { User } from '../entities/user.entity';

export interface UserServicePort {
  createUser(user: Partial<User>): Promise<User>;
  activateUser(contactId: string): Promise<void>;
  activateUserAccount(userId: string): Promise<void>;
  findUserById(userId: string): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;   
  
}
