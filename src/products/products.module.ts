import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductDetailsEntity } from './entities/product-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ProductDetailsEntity])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
