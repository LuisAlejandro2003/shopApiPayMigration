import { UUID } from '../value-objects/uuid.value-object';

export class Contact {
  constructor(
    public readonly id: UUID,
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly phoneNumber: string,
    public readonly userId?: UUID | null,
  ) {}
}
