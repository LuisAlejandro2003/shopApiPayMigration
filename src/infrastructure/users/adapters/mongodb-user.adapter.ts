// src/infrastructure/users/adapters/mongodb-user.adapter.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserServicePort } from 'src/domain/users/ports/user-service.port';
import { User } from 'src/domain/users/entities/user.entity';

@Injectable()
export class MongoDBUserAdapter implements UserServicePort {
  constructor(
    @InjectModel('User') private readonly userModel: Model<any>,
  ) {}

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = new this.userModel(user);
    const savedUser = await newUser.save();

    return new User(savedUser._id.toString(), savedUser.password, savedUser.contactId, savedUser.verifiedAt || null);
  }

  async activateUser(contactId: string): Promise<void> {
    await this.userModel.updateOne({ contactId }, { verifiedAt: new Date() }).exec();
  }
}
