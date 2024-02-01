import { Reflector } from '@nestjs/core';
import { IModelNames } from 'src/auth/connection.guard';

export const Dconnection = Reflector.createDecorator<IModelNames[]>();
export { IModelNames };

