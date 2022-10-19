import {
  InferSubjects,
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';

import { Injectable } from '@nestjs/common';
import { Product } from 'src/product/entities/product.entity';
import { User as UserEntity } from '../user/entities/user.entity';

export enum Action {
  MANAGE_USER = 'manage user',
  MANAGE_PRODUCT = 'manage product',
  GET_SINGLE_PRODUCT = 'get single product',
  READ = 'read information',
}

export type Subjects = InferSubjects<
  typeof UserEntity | typeof Product | 'all'
>;

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.role == 'admin') {
      can(Action.READ, UserEntity);
      can(Action.MANAGE_USER, UserEntity);
    } else if (user.role == 'seller') {
      can(Action.READ, UserEntity);
      can(Action.MANAGE_PRODUCT, Product);
      cannot(Action.MANAGE_USER, UserEntity).because(
        'You are not authorized to do this',
      );
    } else {
      can(Action.READ, UserEntity);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
