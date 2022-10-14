import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCartsCartDto } from './create-product_carts_cart.dto';

export class UpdateProductCartsCartDto extends PartialType(CreateProductCartsCartDto) {}
