// src/domain/payments/ports/payment-service.port.ts
import { Payment } from '../entities/payment.entity';

export interface PaymentServicePort {
    create(payment: Payment): Promise<{ payment: Payment, links: any[] }>;
    findById(id: string): Promise<Payment | null>;
    update(id: string, payment: Partial<Payment>): Promise<Payment>; // Cambiado para aceptar Partial<Payment>
    delete(id: string): Promise<void>;
    capturePayment(orderId: string): Promise<any>;
    findAll(queryParams: any): Promise<any>;
  }
  