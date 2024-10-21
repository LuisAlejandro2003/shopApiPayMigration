import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/domain/users/entities/user.entity';

@Injectable()
export class MongoDBUserAdapter {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }


  async activateUserAccount(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { verifiedAt: new Date() });
  }

  async findUserById(userId: string): Promise<User> {
    return await this.userModel.findById(userId).exec();
}

async findUserByEmail(email: string): Promise<User | null> {
  return await this.userModel.findOne({ email }).exec();
}
}
