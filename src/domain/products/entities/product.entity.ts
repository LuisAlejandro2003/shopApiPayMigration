// src/domain/products/entities/product.entity.ts

export class Product {
    constructor(
      public  id: string,
      public  name: string,
      public  brand: string,
      public  category: string,
      public  price: number,
      public  description?: string,
    ) {
      this.validate();
    }
  
    private validate(): void {
      if (!this.name || this.name.trim().length === 0) {
        throw new Error('Product name cannot be empty.');
      }
      if (!this.brand || this.brand.trim().length === 0) {
        throw new Error('Product brand cannot be empty.');
      }
      if (!this.category || this.category.trim().length === 0) {
        throw new Error('Product category cannot be empty.');
      }
      if (this.price <= 0) {
        throw new Error('Product price must be greater than zero.');
      }
    }
  
    updatePrice(newPrice: number): void {
      if (newPrice <= 0) {
        throw new Error('The new price must be greater than zero.');
      }
      this.price = newPrice;
    }
  }
  