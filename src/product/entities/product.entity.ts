import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.products, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ referencedColumnName: 'id' })
  creator: User;

  @Column({ nullable: true })
  creatorId: number;
}
