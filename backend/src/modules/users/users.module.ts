import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/database/prisma.service';
import { CaslModule } from 'src/casl/casl.module';


@Module({
  imports: [CaslModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService]
})
export class UsersModule {}