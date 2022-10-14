import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductCartsCartService } from './product_carts_cart.service';

@Controller('product-carts-cart')
export class ProductCartsCartController {
  constructor(
    private readonly productCartsCartService: ProductCartsCartService,
  ) {}

  @Post('add-product-to-cart/:cartId')
  addUserToProject(
    @Param('cartId') cartId: number,
    @Body('productId') productId: number,
  ) {
    return this.productCartsCartService.addProductToCart(cartId, productId);
  }

  @Get('list-all-products-in-cart/:cartId')
  getAllProductsInCart(@Param('cartId') cartId: number) {
    return this.productCartsCartService.getAllProductsInCart(cartId);
  }
}
