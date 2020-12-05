export class OrderChange {

    id_order !: number;
    id_phase !: number;
    priority !: string;
    description !: string;
    creation_date !: string;
    finish_date ?: string;
    state !: string;

    constructor(){
        const date:Date = new Date();
        this.creation_date =date.toLocaleDateString();
        console.log(date);
    }
}