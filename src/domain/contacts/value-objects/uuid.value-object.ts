import { v4 as uuidv4 } from 'uuid';

export class UUID {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value ? value : uuidv4();
  }

  toString(): string {
    return this.value;
  }
}
