import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from 'src/domain/tokens/entities/token.entity';

@Injectable()
export class MongoDBTokenAdapter {
  constructor(@InjectModel(Token.name) private readonly tokenModel: Model<Token>) {}

  async generateToken(userId: string, phoneNumber: string): Promise<string> {
    const tokenData = {
      userId,
      value: 'token_value',
      phoneNumber,
      createdAt: new Date(),
      validAt: new Date(Date.now() + 3600000), // por ejemplo, válido por 1 hora
    };
    const newToken = new this.tokenModel(tokenData);
    await newToken.save();
    return newToken._id.toString();
  }
  

  async findByValue(value: string): Promise<Token | null> {
    return await this.tokenModel.findOne({ value });
  }
}
