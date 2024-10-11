
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductServicePort } from 'src/domain/products/ports/product-service.port';
import { Product } from 'src/domain/products/entities/product.entity';

@Injectable()
export class MongoDBProductAdapter implements ProductServicePort {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async findAll(query: any, page: number, limit: number): Promise<any> {
    const skip = (page - 1) * limit;
    const filters = { brand: query.brand, category: query.category };
    const [totalItems, data] = await Promise.all([
      this.productModel.countDocuments(filters),
      this.productModel.find(filters).skip(skip).limit(limit).exec(),
    ]);

    return { totalItems, itemCount: data.length, totalPages: Math.ceil(totalItems / limit), data };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  async create(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async update(id: string, product: Product): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, product, { new: true }).exec();
    if (!updatedProduct) throw new NotFoundException(`Product with ID ${id} not found`);
    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) throw new NotFoundException(`Product with ID ${id} not found`);
  }

  async findByBrand(brand: string): Promise<Product[]> {
    return this.productModel.find({ brand }).exec();
  }

  async findByCategory(category: string): Promise<Product[]> {
    return this.productModel.find({ category }).exec();
  }

  async findByPriceRange(min: number, max: number): Promise<Product[]> {
    return this.productModel.find({ price: { $gte: min, $lte: max } }).exec();
  }
}
