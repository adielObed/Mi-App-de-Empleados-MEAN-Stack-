import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

import { EmpleadoServicio } from '../../services/empleado.servicio';
import { DepartamentoServicio } from '../../services/departamento.servicio';
import { Empleado } from '../../models/empleado.modelo';
import { Departamento } from '../../models/departamento.modelo';

@Component({
  selector: 'app-vista-organizacional',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './vista-organizacional.html',
  styleUrl: './vista-organizacional.css'
})
export class VistaOrganizacionalComponent implements OnInit {
  departamentos: Departamento[] = [];
  empleados: Empleado[] = [];

  constructor(
    private empleadoServicio: EmpleadoServicio,
    private departamentoServicio: DepartamentoServicio
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.departamentoServicio.obtenerDepartamentos().subscribe(depts => {
      this.departamentos = depts;
      this.empleadoServicio.obtenerEmpleados().subscribe(emps => {
        this.empleados = emps;
      });
    });
  }

  obtenerEmpleadosPorDepto(deptCodigo: number): Empleado[] {
    return this.empleados.filter(e => e.codigo_departamento === deptCodigo);
  }
}
