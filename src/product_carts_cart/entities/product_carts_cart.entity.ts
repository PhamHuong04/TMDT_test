import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Cart } from '../../cart/entities/cart.entity';

@Entity()
export class ProductCartsCart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.id, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ referencedColumnName: 'id' })
  product: Product;

  @Column({ nullable: false })
  productId: number;

  @ManyToOne(() => Cart, (cart) => cart.id, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ referencedColumnName: 'id' })
  cart: Cart;

  @Column({ nullable: false })
  userId: number;
}
