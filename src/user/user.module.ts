import { Module, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { AuthHelper } from './auth.helper';
import { AbilityModule } from 'src/ability/ability.module';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AbilityModule,
    forwardRef(() => CartModule),
  ],
  controllers: [UserController],
  providers: [UserService, AuthHelper, JwtService],
})
export class UserModule {}
