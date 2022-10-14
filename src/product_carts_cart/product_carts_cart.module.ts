import { Module } from '@nestjs/common';
import { ProductCartsCartService } from './product_carts_cart.service';
import { ProductCartsCartController } from './product_carts_cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCartsCart } from './entities/product_carts_cart.entity';
import { AbilityModule } from '../ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCartsCart]), AbilityModule],
  controllers: [ProductCartsCartController],
  providers: [ProductCartsCartService],
})
export class ProductCartsCartModule {}
