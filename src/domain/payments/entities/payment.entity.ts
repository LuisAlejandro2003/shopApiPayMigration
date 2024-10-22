export class Payment {
  constructor(
    public id: string,
    public title: string,
    public price: number,
    public status: string,
    public externalReference: string,
    public successUrl: string,
    public failureUrl: string,
    public productId: string, // Agregamos el productId
    public approvalUrl?: string
  ) {
    this.validate();
  }

  // Método de validación
  private validate(): void {
    if (!this.title || this.title.trim().length === 0) {
      throw new Error('Title cannot be empty.');
    }
    if (this.price <= 0) {
      throw new Error('Price must be greater than zero.');
    }
    if (!this.status || this.status.trim().length === 0) {
      throw new Error('Status cannot be empty.');
    }
    if (!this.externalReference || this.externalReference.trim().length === 0) {
      throw new Error('External Reference cannot be empty.');
    }
    if (!this.productId || this.productId.trim().length === 0) {
      throw new Error('ProductId cannot be empty.');
    }
  }

  updateStatus(newStatus: string): void {
    this.status = newStatus;
  }
}
