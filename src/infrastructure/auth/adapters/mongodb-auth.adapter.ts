// src/infrastructure/auth/adapters/mongodb-auth.adapter.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthServicePort } from 'src/domain/auth/ports/auth-service.port';
import { User } from 'src/domain/users/entities/user.entity';
import { compare } from 'bcrypt';

@Injectable()
export class MongoDBAuthAdapter implements AuthServicePort {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();

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
