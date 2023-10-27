export interface Fattura{
    id:number;
    importo:number;
    emissione:Date;
    pagamento:Date;
}

export class Fattura{
    constructor(
        public importo:number,
        public emissione:Date
    ) {}
}