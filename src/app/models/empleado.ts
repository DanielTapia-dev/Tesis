export class EmpleadoModel {
    id: number;
    nombre1: string;
    nombre2: string;
    apellido1: string;
    apellido2: string;
    foto: string;
    tipo: string;
    titulo_abreviado: string;
    titulo: string;
    email: string;
    usuario: string;
    password: string;

    constructor() {
        this.id = 0;
        this.nombre1 = '';
        this.nombre2 = ''
        this.apellido1 = ''
        this.apellido2 = ''
        this.tipo = ''
        this.foto = ''
        this.titulo_abreviado = ''
        this.titulo = ''
        this.email = ''
        this.usuario = ''
        this.password = ''
    }
}
