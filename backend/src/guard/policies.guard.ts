import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import {
    AppAbility,
    CaslAbilityFactory,
  } from 'src/casl/casl-ability.factory/casl-ability.factory';
  import { CHECK_POLICIES_KEY } from './policies.check';
  import { PolicyHandler } from './policies.handler';
  
  @Injectable()
  export class PoliciesGuard implements CanActivate {
    constructor(
      private reflector: Reflector,
      private caslAbilityFactory: CaslAbilityFactory,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const policyHandlers =
        this.reflector.get<PolicyHandler[]>(
          CHECK_POLICIES_KEY,
          context.getHandler(),
        ) || [];
  
      const { user } = context.switchToHttp().getRequest();
      const ability = this.caslAbilityFactory.createForUser(user);
  
      const allPoliciesValid = policyHandlers.every((handler) =>
        this.execPolicyHandler(handler, ability),
      );
  
      if (!allPoliciesValid) {
        throw new ForbiddenException({
          statusCode: 403,
          message: 'Você não tem permissão para acessar este recurso.',
          error: 'Acesso restrito',
        });
      }
  
      return allPoliciesValid;
    }
  
    private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
      if (typeof handler === 'function') {
        return handler(ability);
      }
      return handler.handle(ability);
    }
  }