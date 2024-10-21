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
    const userDocument = await this.userModel.findById(userId).exec();
    if (!userDocument) {
      throw new Error('User not found');
    }

    // Map the document to the User entity
    const user = new User(
      userDocument.id,
      userDocument.email,
      userDocument.password,
      userDocument.contactId,
      userDocument.phoneNumber,
      userDocument.verifiedAt
    );

    // Call the domain method
    user.activateAccount();

    // Save the updated data back to the database
    await this.userModel.findByIdAndUpdate(userId, { verifiedAt: user.verifiedAt });
  }
  

  async findUserById(userId: string): Promise<User> {
    return await this.userModel.findById(userId).exec();
}

async findUserByEmail(email: string): Promise<User | null> {
  return await this.userModel.findOne({ email }).exec();
}
}
