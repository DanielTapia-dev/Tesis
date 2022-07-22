export class SucursalModel {
    id: number;
    nombre: string;
    direccion: string;
    estado: boolean;

    constructor() {
        this.id = 0,
            this.nombre = '',
            this.direccion = '',
            this.estado = true
    }
}