import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductDetailsEntity } from './product-details.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('int')
  qty: number;

  @Column('float')
  price: number;

  @OneToOne(() => ProductDetailsEntity)
  @JoinColumn()
  productDetails: ProductDetailsEntity;
}
