import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { ProductService } from '../product/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartReposity: Repository<Cart>,

    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}
  async create() {
    const cart = new Cart();
    return this.cartReposity.save(cart);
  }

  async addProductIntoCart(cartId: number, listProduct: number[]) {
    const cart: Cart = await this.cartReposity.findOneBy({ id: cartId });
    cart.products = await Promise.all(
      listProduct.map(
        async (productId) => await this.productService.findOne(productId),
      ),
    );
    return this.cartReposity.save(cart);
  }

  findAllProductIncart(id: number) {
    return this.cartReposity.findBy({ id });
  }

  findOne(id: number) {
    return this.cartReposity.findOneBy({ id });
  }

  async remove(cartId: number, productId: number) {
    const cart: Cart = await this.cartReposity.findOneBy({ id: cartId });
    cart.products = cart.products.filter((product) => product.id != productId);
    return await this.cartReposity.save(cart);
  }
}
