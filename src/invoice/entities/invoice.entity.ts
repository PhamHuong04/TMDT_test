import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @ManyToOne(() => User, (user) => user.invoices)
  user: User;

  @Column({ type: 'date', nullable: true })
  created_at: Date | null;
}
