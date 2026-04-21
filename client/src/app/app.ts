import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BarraNavegacionComponent } from './components/barra-navegacion/barra-navegacion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BarraNavegacionComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  title = 'Prueba técnica desarrollador MEAN Stack';
}
