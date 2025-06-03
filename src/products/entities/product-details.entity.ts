import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product-details' })
export class ProductDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  part_number: string;

  @Column({ length: 45 })
  dimension: string;

  @Column('float')
  weight: number;

  @Column({ length: 45 })
  manufacturer: string;

  @Column({ length: 45 })
  origin: string;
}
