import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Especialidad } from '../interfaces/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.baseUrl;

  obtenerEspecialidades() {
    const url = `${this.baseUrl}especialidad/activas`
    const headers = new HttpHeaders().set('auth-token', localStorage.getItem('token') || '');
    return this.http.get<Especialidad[]>(url, { headers });
  }


}
