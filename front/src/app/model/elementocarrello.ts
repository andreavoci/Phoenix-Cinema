
import { Programmazione } from "./programmazione";

export interface ElementoCarrello{
    id:number;
    programmazione:Programmazione;
    posto:number;
    costo:number;
}

export class ElementoCarrello{
    constructor(
        public programmazione:Programmazione,
        public posto:number,
        public costo:number
    ) {}
}