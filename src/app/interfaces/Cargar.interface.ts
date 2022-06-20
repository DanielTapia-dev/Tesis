import { Cliente } from '../models/clientes';
import { Consulta } from '../models/consulta';
import { Diagnostico } from '../models/diagnostico';

export interface CargarClientes {
    clientes: Cliente[];
}

export interface CargarDiagnosticos {
    diagnosticos: Diagnostico[];
}

export interface CargarConsulta {
    consulta: Consulta;
}