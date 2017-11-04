export class Usuario {
    nombre: string;
    avatar: string;
    email: string;
    uid: string;
    moneda: string;
    balance: number;

    constructor(nombre: string, avatar: string, email: string, uid: string, moneda: string) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.email = email;
        this.moneda = moneda;
        this.uid = uid;
        this.balance = 0;
    }
}