import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { UserRole } from '../../common/enum/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @IsIn([UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SELLER])
  role: string;
}
