import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../models/departamento.modelo';
@Injectable({
  providedIn: 'root'
})
export class DepartamentoServicio {
  private apiUrl = '/api/departamentos';
  constructor(private http: HttpClient) { }
  obtenerDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl);
  }
  crearDepartamento(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(this.apiUrl, departamento);
  }
  actualizarDepartamento(codigo: number, departamento: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.apiUrl}/${codigo}`, departamento);
  }
  eliminarDepartamento(codigo: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${codigo}`);
  }
}
