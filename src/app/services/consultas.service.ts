import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = environment.baseUrl;

  postConsulta(formData: object) {
    const url = `${this.baseUrl}consulta/crearConsultaEnfermero`;
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.post<any>(url, formData, { headers });
  }

  getConsultas(id: string) {
    console.log(id);
    const url = `${this.baseUrl}consulta/pacienteConsultas/${id}`;
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.get<Consulta[]>(url, { headers });
  }

  obtenerConsulta(id: number) {
    console.log(id);
    const url = `${this.baseUrl}consulta/obtenerConsulta/${id}`;
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.get<any>(url, { headers });
  }

  putConsulta(formData: object) {
    const url = `${this.baseUrl}consulta/actualizarConsulta`;
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');
    return this.http.put(url, formData, { headers });
  }

  postConsultaMedico(formData: object) {
    const url = `${this.baseUrl}consulta/crearConsultaMedico`;
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.post<any>(url, formData, { headers });
  }

  getSolicitud(id: number) {
    const url = `${this.baseUrl}consulta/obtenerSolicitud/${id}`;
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');
    return this.http.get<any>(url, { headers });
  }

  getSolicitudes() {
    const url = `${this.baseUrl}consulta/obtenerSolicitudes`;
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.get<any>(url, { headers });
  }

  cambiarEstadoConsulta(formData: object) {
    const url = `${this.baseUrl}consulta/cambiarEstadoConsulta`;
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');
    return this.http.put(url, formData, { headers });
  }

  postSolicitud(formData: object) {
    const url = `${this.baseUrl}consulta/crearSolicitudBorrado`;
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');
    return this.http.post<any>(url, formData, { headers });
  }
}

