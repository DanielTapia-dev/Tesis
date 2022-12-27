import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmpleadoModel } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = environment.baseUrl;

  postEmpleado(formData: FormData) {
    const url = `${this.baseUrl}empleados/postEmpleado`;
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.post<any>(url, formData, { headers });
  }

  putEmpleado(formData: any) {
    const url = `${this.baseUrl}empleados`;
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.put<any>(url, formData, { headers });
  }

  cambiarEstadoEmpleado(formData: any) {
    const url = `${this.baseUrl}empleados/cambiarEstadoEmpleado`;
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.post<any>(url, formData, { headers });
  }


  getEmpleados() {
    const url = `${this.baseUrl}empleados/`;
    const headers = new HttpHeaders()
      .set('auth-token', localStorage.getItem('token') || '');

    return this.http.get<any>(url, { headers });
  }

}
