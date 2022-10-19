import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToMany(() => Product, {
    eager: true,
  })
  @JoinTable()
  products: Product[];
}
