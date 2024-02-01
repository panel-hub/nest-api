import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const DPublic = () => SetMetadata(IS_PUBLIC_KEY, true);