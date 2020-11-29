export class OrderChange {

    id_order !: number;
    id_phase !: number;
    priority !: string;
    description !: string;
    create_date !: string;
    finish_date ?: string;
    state !: string;

    OrderChange(){
        this.create_date = new Date().toLocaleDateString();
    }
}