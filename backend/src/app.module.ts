import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './modules/users/users.service';
import { UsersController } from './modules/users/users.controller';
import { UsersModule } from './modules/users/users.module';
import { TypeUsersService } from './modules/type-users/type-users.service';
import { TypeUsersController } from './modules/type-users/type-users.controller';
import { TypeUsersModule } from './modules/type-users/type-users.module';
import { PrismaModule } from './database/prisma.module';
import { CaslModule } from './casl/casl.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, TypeUsersModule,CaslModule,PrismaModule,AuthModule],
  controllers: [AppController, UsersController, TypeUsersController],
  providers: [AppService, UsersService, TypeUsersService],
})
export class AppModule {}
