import { Programmazione } from "./programmazione";

export interface Biglietto{
    id:number;
    programmazione:Programmazione;
    posto:number;
    costo:number;
}

export class Biglietto{
    constructor(
        public programmazione:Programmazione,
        public posto:number,
        public costo:number
    ) {}
}