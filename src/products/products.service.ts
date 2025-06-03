import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, UpdateProduct } from './interfaces/product.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create.product.dto';
import { ProductDetailsEntity } from './entities/product-details.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductDetailsEntity)
    private readonly productDetailsRepository: Repository<ProductDetailsEntity>,
  ) {}
  async create(product: CreateProductDto): Promise<Product> {
    //save the product details
    const productDetails = await this.productDetailsRepository.save({
      part_number: product.part_number,
      dimension: product.dimension,
      weight: product.weight,
      manufacturer: product.manufacturer,
      origin: product.origin,
    });
    const newProduct = new ProductEntity();
    newProduct.name = product.name;
    newProduct.price = product.price;
    newProduct.qty = product.qty;
    newProduct.productDetails = productDetails;
    await this.productRepository.save(newProduct);
    return { ...newProduct, productDetails };
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
