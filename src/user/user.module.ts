import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AbstractUserService } from './abstract-user.service';

@Module({
  controllers: [],
  providers: [{
    provide: AbstractUserService,
    useClass: UserService
  }],
  exports: [AbstractUserService]

})
export class UserModule {}
