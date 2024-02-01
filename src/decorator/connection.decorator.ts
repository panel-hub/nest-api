import { Reflector } from '@nestjs/core';
export type IModelNames = 'Products' | 'Inventory' | 'Navigation'
export const Dconnection = Reflector.createDecorator<IModelNames[]>();
