import { Reflector } from '@nestjs/core';
export const DRoles = Reflector.createDecorator<string[]>();
