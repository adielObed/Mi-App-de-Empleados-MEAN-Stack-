import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado.modelo';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoServicio {
  private apiUrl = '/api/empleados';
  constructor(private http: HttpClient) { }
  obtenerEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }
  crearEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiUrl, empleado);
  }
  actualizarEmpleado(codigo: number, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/${codigo}`, empleado);
  }
  eliminarEmpleado(codigo: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${codigo}`);
  }
}
