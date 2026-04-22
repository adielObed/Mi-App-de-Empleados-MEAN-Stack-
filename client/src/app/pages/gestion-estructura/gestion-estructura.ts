import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DepartamentoServicio } from '../../services/departamento.servicio';
import { Departamento } from '../../models/departamento.modelo';
@Component({
  selector: 'app-gestion-estructura',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './gestion-estructura.html',
  styleUrl: './gestion-estructura.css'
})
export class GestionEstructuraComponent implements OnInit {
  formularioDepto: FormGroup;
  departamentos: Departamento[] = [];
  columnasMostradas: string[] = ['codigo', 'nombre', 'acciones'];
  estaEditando = false;
  constructor(
    private fb: FormBuilder,
    private departamentoServicio: DepartamentoServicio,
    private snackBar: MatSnackBar
  ) {
    this.formularioDepto = this.fb.group({
      codigo: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      nombre: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  ngOnInit(): void {
    this.cargarDepartamentos();
  }
  cargarDepartamentos(): void {
    this.departamentoServicio.obtenerDepartamentos().subscribe(data => this.departamentos = data);
  }
  alEnviar(): void {
    if (this.formularioDepto.invalid) return;
    const datosDepto = this.formularioDepto.getRawValue();
    if (this.estaEditando) {
      this.departamentoServicio.actualizarDepartamento(datosDepto.codigo, datosDepto).subscribe({
        next: () => {
          this.snackBar.open('Área actualizada', 'Cerrar', { duration: 3000 });
          this.limpiarFormulario();
          this.cargarDepartamentos();
        },
        error: (err) => this.snackBar.open('Error: ' + err.message, 'Cerrar')
      });
    } else {
      this.departamentoServicio.crearDepartamento(datosDepto).subscribe({
        next: () => {
          this.snackBar.open('Área creada con éxito', 'Cerrar', { duration: 3000 });
          this.limpiarFormulario();
          this.cargarDepartamentos();
        },
        error: (err) => this.snackBar.open('Error: ' + err.message, 'Cerrar')
      });
    }
  }
  editarDepto(depto: Departamento): void {
    this.estaEditando = true;
    this.formularioDepto.patchValue(depto);
    this.formularioDepto.get('codigo')?.disable();
  }
  eliminarDepto(codigo: number): void {
    if (confirm('¿Eliminar este departamento? Esto podría afectar a los empleados asociados.')) {
      this.departamentoServicio.eliminarDepartamento(codigo).subscribe(() => {
        this.snackBar.open('Departamento eliminado', 'Cerrar', { duration: 3000 });
        this.cargarDepartamentos();
      });
    }
  }
  limpiarFormulario(): void {
    this.estaEditando = false;
    this.formularioDepto.reset();
    this.formularioDepto.get('codigo')?.enable();
  }
}
