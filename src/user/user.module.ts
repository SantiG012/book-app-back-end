import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AbstractUserService } from './abstract-user.service';

@Module({
  controllers: [],
  providers: [{
    provide: AbstractUserService,
    useClass: UserService
  }],

})
export class UserModule {}
