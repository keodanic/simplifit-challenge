import { Module } from '@nestjs/common';
import { TypeUsersService } from './type-users.service';
import { TypeUsersController } from './type-users.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [TypeUsersController],
  providers: [TypeUsersService,PrismaService],
})
export class TypeUsersModule {}