import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { EmpleadoServicio } from '../../services/empleado.servicio';
import { DepartamentoServicio } from '../../services/departamento.servicio';
import { Empleado } from '../../models/empleado.modelo';
import { Departamento } from '../../models/departamento.modelo';
@Component({
  selector: 'app-gestion-talento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './gestion-talento.html',
  styleUrl: './gestion-talento.css'
})
export class GestionTalentoComponent implements OnInit {
  formularioEmpleado: FormGroup;
  empleados: Empleado[] = [];
  departamentos: Departamento[] = [];
  columnasMostradas: string[] = ['codigo', 'nombre', 'apellidos', 'departamento', 'acciones'];
  estaEditando = false;
  constructor(
    private fb: FormBuilder,
    private empleadoServicio: EmpleadoServicio,
    private departamentoServicio: DepartamentoServicio,
    private snackBar: MatSnackBar
  ) {
    this.formularioEmpleado = this.fb.group({
      codigo: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido1: ['', [Validators.required]],
      apellido2: [''],
      codigo_departamento: [null, [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarDepartamentos();
  }
  cargarEmpleados(): void {
    this.empleadoServicio.obtenerEmpleados().subscribe(data => this.empleados = data);
  }
  cargarDepartamentos(): void {
    this.departamentoServicio.obtenerDepartamentos().subscribe(data => this.departamentos = data);
  }
  obtenerNombreDepto(codigo: number): string {
    const dept = this.departamentos.find(d => d.codigo === codigo);
    return dept ? dept.nombre : 'N/A';
  }
  alEnviar(): void {
    if (this.formularioEmpleado.invalid) return;
    const datosEmpleado = this.formularioEmpleado.getRawValue();
    if (this.estaEditando) {
      this.empleadoServicio.actualizarEmpleado(datosEmpleado.codigo, datosEmpleado).subscribe({
        next: () => {
          this.snackBar.open('Empleado actualizado', 'Cerrar', { duration: 3000 });
          this.limpiarFormulario();
          this.cargarEmpleados();
        },
        error: (err) => this.snackBar.open('Error: ' + err.message, 'Cerrar')
      });
    } else {
      this.empleadoServicio.crearEmpleado(datosEmpleado).subscribe({
        next: () => {
          this.snackBar.open('Empleado creado con éxito', 'Cerrar', { duration: 3000 });
          this.limpiarFormulario();
          this.cargarEmpleados();
        },
        error: (err) => this.snackBar.open('Error: ' + err.message, 'Cerrar')
      });
    }
  }
  editarEmpleado(empleado: Empleado): void {
    this.estaEditando = true;
    this.formularioEmpleado.patchValue(empleado);
    this.formularioEmpleado.get('codigo')?.disable();
  }
  eliminarEmpleado(codigo: number): void {
    if (confirm('¿Está seguro de eliminar este empleado?')) {
      this.empleadoServicio.eliminarEmpleado(codigo).subscribe(() => {
        this.snackBar.open('Empleado eliminado', 'Cerrar', { duration: 3000 });
        this.cargarEmpleados();
      });
    }
  }
  limpiarFormulario(): void {
    this.estaEditando = false;
    this.formularioEmpleado.reset();
    this.formularioEmpleado.get('codigo')?.enable();
  }
}
