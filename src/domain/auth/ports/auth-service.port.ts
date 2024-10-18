// src/domain/auth/ports/auth-service.port.ts
export interface AuthServicePort {
  login(email: string, password: string): Promise<any>;
}
