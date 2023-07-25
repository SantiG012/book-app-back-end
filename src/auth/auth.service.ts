import { Injectable } from '@nestjs/common';
import { AbstractAuthService } from './abstract-auth.service';

@Injectable()
export class AuthService implements AbstractAuthService{
    singUp(): Promise<{ access_token: string; }> {
        throw new Error('Method not implemented.');
    }
}
