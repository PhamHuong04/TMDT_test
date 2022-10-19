import { Cart } from '../../cart/entities/cart.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsObject()
  @IsOptional()
  cart: Cart;

  @IsObject()
  @IsOptional()
  invoices: Invoice[];
}
