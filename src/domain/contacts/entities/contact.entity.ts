// src/domain/contacts/entities/contact.entity.ts
export class Contact {
  constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public userId?: string | null,
  ) {}
}
