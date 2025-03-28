import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [NgClass],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css',
})
export class InitComponent {
  constructor(private router: Router) {}
  currentIndex: number = 0; // Índice actual de la imagen visible

  redirectToMap() {
    this.router.navigate(['/map']);
  }

  // Método para cambiar la imagen mostrada
  setSlide(index: number): void {
    this.currentIndex = index;
  }

  // Método para avanzar a la siguiente imagen
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % 3; 
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + 3) % 3; 
  }
}
