export class Payment {
    constructor(
        public id: string,
        public title: string,
        public price: number,
        public status: string,
        public externalReference: string,
        public successUrl: string,   // <-- Asegúrate de que estas propiedades están presentes
        public failureUrl: string,   // <-- Asegúrate de que estas propiedades están presentes
        public approvalUrl?: string  // <-- Esta es opcional y solo se añade cuando es devuelta por PayPal 
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
    }
  
    updateStatus(newStatus: string): void {
      this.status = newStatus;
    }
  }
  