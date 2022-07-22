import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sucursal } from '../interfaces/sucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.baseUrl;

  obtenerSucursales() {
    const url = `${this.baseUrl}sucursal/activas`;
    const headers = new HttpHeaders().set('auth-token', localStorage.getItem('token') || '');
    return this.http.get<Sucursal[]>(url, { headers });
  }
}
