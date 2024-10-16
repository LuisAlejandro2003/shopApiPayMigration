// src/domain/users/entities/user.entity.ts
export class User {
    constructor(
      public readonly id: string | null,
      public readonly password: string,
      public readonly contactId: string,
      public verifiedAt: Date | null = null,
    ) {}
  }
  