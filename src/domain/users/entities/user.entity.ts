export class User {
    constructor(
      public readonly id: string | null,
      public readonly email: string,
      public readonly password: string,
      public readonly contactId: string,
      public readonly phoneNumber: string, // Añadir phoneNumber
      public verifiedAt: Date | null = null,
    ) {}
  }
