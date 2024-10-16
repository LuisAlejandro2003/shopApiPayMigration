// src/domain/tokens/entities/token.entity.ts
export class Token {
    constructor(
      public readonly id: string,
      public readonly value: string,
      public readonly type: string,
      public readonly userId: string,
      public readonly createdAt: Date,
      public readonly validAt: Date,
    ) {}
  }
  