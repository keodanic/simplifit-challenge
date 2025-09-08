import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata(process.env.JWT_SECRET, true);