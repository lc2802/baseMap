import { Routes } from '@angular/router';
import { InitComponent } from './componentes/init/init.component';
import { MapComponent } from './componentes/map/map.component';

export const routes: Routes = [
  { path: 'init', component: InitComponent },
  { path: '', redirectTo: '/init', pathMatch: 'full' },  // Esta ruta redirige a '/init'
  { path: 'map', component: MapComponent },
];
