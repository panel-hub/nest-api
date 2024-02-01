import { Reflector } from '@nestjs/core';
export type IModelNames = 'Products'
export const Dconnection = Reflector.createDecorator<IModelNames[]>();
