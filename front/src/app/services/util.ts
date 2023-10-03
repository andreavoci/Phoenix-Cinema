
export namespace Util {

    export const serverUrl = 'http://localhost:8091';
    export const userServerUrl = 'http://localhost:8091/api/users/';
    export const bigliettiServerUrl = 'http://localhost:8091/api/biglietti';
    export const authServerUrl = 'http://localhost:8091/api/auth/';
    export const pellicoleServerUrl = 'http://localhost:8091/api/pellicole';

}


export interface LoginResponse {
    token: string
  }