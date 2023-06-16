
export namespace Util {

    export const serverUrl = 'http://localhost:8091';
    export const userServerUrl = 'http://localhost:8091/api/users/';
    export const authServerUrl = 'http://localhost:8091/api/auth/';

}


export interface LoginResponse {
    token: string
  }