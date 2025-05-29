import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, UpdateProduct } from './interfaces/product.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create.product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}
  products: Product[] = [];
  async create(product: CreateProductDto): Promise<Product> {
    return await this.productRepository.save(product);
  }
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }
  async findOne(id: number): Promise<Product> {
    const result = await this.productRepository.findOneBy({ id });
    if (!result) {
      throw new NotFoundException('Could not find any product');
    }
    return result;
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.productRepository.delete(id);
  }
  async update(
    id: number,
    recordToUpdate: UpdateProduct,
  ): Promise<UpdateResult> {
    return await this.productRepository.update(id, recordToUpdate);
  }
}
