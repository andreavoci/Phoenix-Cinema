
export namespace Util {

    export const serverUrl = 'http://localhost:8091';
    export const userServerUrl = 'http://localhost:8091/api/users';
    export const bigliettiServerUrl = 'http://localhost:8091/api/biglietti';
    export const authServerUrl = 'http://localhost:8091/api/auth';
    export const pellicoleServerUrl = 'http://localhost:8091/api/pellicole';
    export const programmazioniServerUrl = 'http://localhost:8091/api/programmazioni';
    export const carrelloServerUrl = 'http://localhost:8091/api/carrello';
    export const ordiniServerUrl = 'http://localhost:8091/api/ordini';
    export const saleServerUrl = 'http://localhost:8091/api/sale';
    export const fornitureServerUrl = 'http://localhost:8091/api/forniture';
    export const fornitoriServerUrl = 'http://localhost:8091/api/fornitori';
    export const candidatureServerUrl = 'http://localhost:8091/api/candidature';
    export const dipendentiServerUrl = 'http://localhost:8091/api/dipendenti';
    export const inventarioServerUrl = 'http://localhost:8091/api/inventario';

    export function getPagineGestione(ruolo: string): string[] {
        if(ruolo=="DIRETTORE"){
            return ["fornitura","fornitore","magazziniere","fatture","biglietteria","proiezione"]
        }
        else if(ruolo=="HR"){
            return ["hr"]
        }else if(ruolo=="BIGLIETTERIA"){
            return ["biglietteria"]
        }else if(ruolo=="PROIEZIONE"){
            return ["proiezione"]
        }
        return []
    }

}


export interface LoginResponse {
    id: string,
    token: string
  }
