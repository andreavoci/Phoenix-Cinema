import { Programmazione } from "./programmazione";

export interface Biglietto{

    id:number;
    programmazione:Programmazione;
    posto:number;
    costo:number;
}
    