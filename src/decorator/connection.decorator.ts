import { Reflector } from '@nestjs/core';
export type IModelNames = 'Products' | 'Inventory' | 'Navigation' | 'SPFieldMapping'
export const Dconnection = Reflector.createDecorator<IModelNames[]>();
