import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from 'src/domain/tokens/entities/token.entity';

@Injectable()
export class MongoDBTokenAdapter {
  constructor(@InjectModel(Token.name) private readonly tokenModel: Model<Token>) {}

  private generateFourDigitToken(): string {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Genera un token de 4 dígitos
  }

  async generateToken(userId: string, phoneNumber: string): Promise<string> {
    const tokenValue = this.generateFourDigitToken(); // Generar un token de 4 dígitos
    const tokenData = {
      userId,
      value: tokenValue,
      createdAt: new Date(),
      validAt: new Date(Date.now() + 3600000), // por ejemplo, válido por 1 hora
    };
    const newToken = new this.tokenModel(tokenData);
    await newToken.save();
    return tokenValue; // Retornar el valor del token generado
  }

  async findByValue(value: string): Promise<Token | null> {
    return await this.tokenModel.findOne({ value });
  }
}