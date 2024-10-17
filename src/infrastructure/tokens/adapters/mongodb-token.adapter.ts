import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from 'src/domain/tokens/entities/token.entity';

@Injectable()
export class MongoDBTokenAdapter {
  constructor(@InjectModel(Token.name) private readonly tokenModel: Model<Token>) {}

  private generateFourDigitToken(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  async generateToken(userId: string, phoneNumber: string): Promise<string> {
    const tokenValue = this.generateFourDigitToken();
    const tokenData = {
      userId,
      value: tokenValue,
      createdAt: new Date(),
      validAt: new Date(Date.now() + 3600000),
    };
    const newToken = new this.tokenModel(tokenData);
    await newToken.save();
    return tokenValue;
  }

  async validateToken(userId: string, token: string): Promise<boolean> {
    const foundToken = await this.tokenModel.findOne({
      userId,
      value: token,
      validAt: { $gt: new Date() },
    });
    return !!foundToken;
  }

  async invalidateToken(id: string): Promise<void> {
    await this.tokenModel.findByIdAndUpdate(id, { validAt: new Date() });
  }

  async findByValue(value: string): Promise<Token | null> {
    return await this.tokenModel.findOne({ value });
  }
}
