import {
    Ability,
    AbilityBuilder,
    AbilityClass,
    ExtractSubjectType,
  } from '@casl/ability';
  import { Injectable } from '@nestjs/common';
  import { Action, User } from '../dto/casl.dto';
  
  type Subjects = 'all';
  
  export type AppAbility = Ability<[Action, Subjects]>;
  
  @Injectable()
  export class CaslAbilityFactory {
    createForUser(user: User) {
      const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
        Ability as AbilityClass<AppAbility>,
      );
  
      if (user?.role === 'SUPERADMIN') {
        can(Action.Superadmin, 'all');
      } else {
        can(Action.Admin, 'all');
      }
  
      return build({
        detectSubjectType: (item: any) =>
          item.constructor as ExtractSubjectType<Subjects>,
      });
    }
  }