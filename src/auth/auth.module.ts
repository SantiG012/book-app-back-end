import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AbstractAuthService } from './abstract-auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({})
  ],
  providers: [
      {
        provide: AbstractAuthService,
        useClass: AuthService
      },
      JwtStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {}
