import { Routes } from '@angular/router';
import { GestionTalentoComponent } from './pages/gestion-talento/gestion-talento';
import { GestionEstructuraComponent } from './pages/gestion-estructura/gestion-estructura';
import { VistaOrganizacionalComponent } from './pages/vista-organizacional/vista-organizacional';
export const routes: Routes = [
    { path: '', redirectTo: 'vista-organizacional', pathMatch: 'full' },
    { path: 'talento', component: GestionTalentoComponent },
    { path: 'estructura', component: GestionEstructuraComponent },
    { path: 'vista-organizacional', component: VistaOrganizacionalComponent },
];
