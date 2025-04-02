import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

declare var bootstrap: any;  // Para poder usar el carrusel de Bootstrap

@Component({
  selector: 'app-init',
  standalone: true,
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css'],
})
export class InitComponent implements AfterViewInit {
  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      const carouselElement = document.querySelector('#carouselExampleIndicators');
      if (carouselElement) {
        new bootstrap.Carousel(carouselElement, {
          interval: 3000, 
          pause: 'hover', 
          wrap: true,     
        });
      }
    }, 0); 
  }

  redirectToMap() {
    this.router.navigate(['/map']);
  }
}
