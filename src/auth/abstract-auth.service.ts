export abstract class AbstractAuthService {
    abstract singUp():Promise<{access_token:string}>;
}
