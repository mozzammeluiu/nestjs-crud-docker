import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create.product.dto';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './products.service';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { TransformInterceptor } from 'src/common/interceptors/transform/transform.interceptor';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateProductDto } from './dto/update.product.dto';

@Controller('products')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(TransformInterceptor)
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Post()
  async create(@Body() product: CreateProductDto): Promise<Product> {
    return this.productService.create(product);
  }
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.productService.delete(id);
  }
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() recordToUpdate: UpdateProductDto,
  ): Promise<UpdateResult> {
    return this.productService.update(+id, recordToUpdate);
  }
}
