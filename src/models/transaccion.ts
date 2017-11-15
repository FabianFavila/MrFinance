export interface Transaccion {
    cantidad: number;
    titulo: string,
    descripcion: string;
    tipo: boolean;
    icono: string;
    categoria: string;
    fecha: string;
    cartera: string;
    key?: string;
}