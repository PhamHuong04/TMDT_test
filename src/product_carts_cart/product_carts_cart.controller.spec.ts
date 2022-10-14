import { Test, TestingModule } from '@nestjs/testing';
import { ProductCartsCartController } from './product_carts_cart.controller';
import { ProductCartsCartService } from './product_carts_cart.service';

describe('ProductCartsCartController', () => {
  let controller: ProductCartsCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCartsCartController],
      providers: [ProductCartsCartService],
    }).compile();

    controller = module.get<ProductCartsCartController>(ProductCartsCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
