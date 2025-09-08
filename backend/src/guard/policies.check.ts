import { SetMetadata } from '@nestjs/common';
import { PolicyHandler } from './policies.handler';

export const CHECK_POLICIES_KEY = process.env.CHECK_POLICIES_KEY;
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);