
export interface Merce{
    id:number;
    nome:string;
    tipo:string;
    prezzo:number;
    quantita:number;
}

export class Merce{
    constructor(
        public nome:string,
        public tipo:string,
        public prezzo:number,
        public quantita:number
    ) {}
}