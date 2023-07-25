import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AbstractAuthService } from './abstract-auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({})
  ],
  providers: [{
    provide: AbstractAuthService,
    useClass: AuthService
  }],
  controllers: [AuthController]
})
export class AuthModule {}
