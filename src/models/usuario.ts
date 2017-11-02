export class Usuario {
    nombre: string;
    avatar: string;
    email: string;
    uid: string;
    balance: number;

    constructor(nombre: string, avatar: string, email: string, uid: string) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.email = email;
        this.uid = uid;
    }
}