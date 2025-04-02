import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],  // Asegúrate de que no falte RouterModule si es necesario
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  redirectToMap() {
    this.router.navigate(['/map']);  // Redirige a la ruta de 'map'
  }

  redirectToHome() {
    this.router.navigate(['']);  // Redirige a la ruta de inicio
  }
}
