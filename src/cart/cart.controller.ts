import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { User } from 'src/common/decorator/user.decorator';
import { CartService } from './cart.service';
import { User as UserEntity } from '../user/entities/user.entity';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Product } from '../product/entities/product.entity';
import { AuthGuard } from '@nestjs/passport';
import { AbilitiesGuard } from '../ability/abilities.guard';

@Controller('cart')
@UseGuards(AuthGuard('jwt'))
// AbilitiesGuard
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('create-new-cart')
  create() {
    return this.cartService.create();
  }

  @Post('add-products-into-cart')
  addProductsIntoCart(@User() user: UserEntity, @Body() listProduct: number[]) {
    return this.cartService.addProductIntoCart(user.cart.id, listProduct);
  }

  @Get('get-all-product-in-cart/:id')
  findAllProductsInCart(@Param('id') id: number) {
    return this.cartService.findAllProductIncart(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cartService.findOne(+id);
  }

  @Delete('remove-product-from-cart/:productId')
  remove(@User() user: UserEntity, @Param('productId') productId: number) {
    return this.cartService.remove(user.cart.id, productId);
  }
}
