import { Test, TestingModule } from '@nestjs/testing';
import { ProductCartsCartService } from './product_carts_cart.service';

describe('ProductCartsCartService', () => {
  let service: ProductCartsCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCartsCartService],
    }).compile();

    service = module.get<ProductCartsCartService>(ProductCartsCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
