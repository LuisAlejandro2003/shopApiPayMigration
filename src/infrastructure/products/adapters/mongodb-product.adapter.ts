// src/infrastructure/products/adapters/mongodb-product.adapter.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductServicePort } from 'src/domain/products/ports/product-service.port';
import { Product } from 'src/domain/products/entities/product.entity';
import { ProductDocument } from './product.schema';

@Injectable()
export class MongoDBProductAdapter implements ProductServicePort {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(product: Product): Promise<Product> {
    const createdProduct = new this.productModel(product);
    const savedProduct = await createdProduct.save();
    return new Product(
      savedProduct._id.toString(),
      savedProduct.name,
      savedProduct.brand,
      savedProduct.category,
      savedProduct.price,
      savedProduct.description,
    );
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products.map((prod) => new Product(
      prod._id.toString(),
      prod.name,
      prod.brand,
      prod.category,
      prod.price,
      prod.description,
    ));
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Product not found');
    return new Product(
      product._id.toString(),
      product.name,
      product.brand,
      product.category,
      product.price,
      product.description,
    );
  }

  async update(id: string, product: Product): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      {
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        description: product.description,
      },
      { new: true },
    ).exec();

    if (!updatedProduct) throw new NotFoundException('Product not found');
    return new Product(
      updatedProduct._id.toString(),
      updatedProduct.name,
      updatedProduct.brand,
      updatedProduct.category,
      updatedProduct.price,
      updatedProduct.description,
    );
  }

  async delete(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Product not found');
  }
}
