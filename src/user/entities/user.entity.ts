import { Cart } from '../../cart/entities/cart.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { Product } from '../../product/entities/product.entity';
import { UserRole } from '../../common/enum/role.enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: string;

  @OneToOne(() => Cart, {
    // onDelete: 'SET NULL',
    // onUpdate: 'CASCADE',
    // nullable: true,
    eager: true,
  })
  @JoinColumn()
  cart: Cart;

  @OneToMany(() => Product, (product) => product.creator)
  products: Product[];

  @OneToMany(() => Invoice, (invoice) => invoice.user, {
    nullable: true,
  })
  invoices: Invoice[];
}
