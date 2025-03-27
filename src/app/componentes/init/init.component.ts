import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-init',
  standalone: true,  
  imports: [],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css',
})
export class InitComponent {
  constructor(private router: Router) {}

  redirectToMap() {
    // Redirigir a la ruta 'mapa'
    this.router.navigate(['/map']);
  }
}
