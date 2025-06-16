import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, UpdateProduct } from './interfaces/product.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
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
    return await this.productRepository.find({ relations: ['productDetails'] });
  }
  async findOne(id: number): Promise<Product> {
    const result = await this.productRepository.findOne({
      where: { id },
      relations: ['productDetails'],
    });
    if (!result) {
      throw new NotFoundException('Could not find any product');
    }
    return result;
  }
  async delete(id: number): Promise<any> {
    const result = await this.productRepository.findOne({
      where: { id },
      relations: ['productDetails'],
    });
    if (result?.productDetails?.id) {
      await this.productDetailsRepository.delete(id);
    }
    await this.productRepository.delete(id);
    return {
      msg: `Product is deleted with id : ${id} and product details with id : ${result?.productDetails?.id}`,
    };
  }
  async update(id: number, recordToUpdate: UpdateProduct): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['productDetails'],
    });
    console.log(product, 'product');
    if (!product) {
      throw new NotFoundException('Could not find any product with this id');
    }
    const { qty, price, name } = recordToUpdate;
    this.productRepository.merge(product, {
      qty,
      price,
      name,
    });
    const updatedProduct = await this.productRepository.save(product);
    const { part_number, dimension, weight, manufacturer, origin } =
      recordToUpdate;
    const foundDetails = await this.productDetailsRepository.findOne({
      where: {
        id: product.productDetails.id,
      },
    });
    if (foundDetails) {
      this.productDetailsRepository.merge(foundDetails, {
        part_number,
        dimension,
        weight,
        manufacturer,
        origin,
      });
    }
    const updatedDetails = await this.productDetailsRepository.save(
      foundDetails || {},
    );
    return { ...updatedProduct, productDetails: updatedDetails };
  }
}
