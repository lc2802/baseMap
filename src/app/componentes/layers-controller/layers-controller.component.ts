import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-layer-controller',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './layers-controller.component.html',
  styleUrls: ['./layers-controller.component.css'],
})
export class LayerControllerComponent {
  @Output() mapaSeleccionado = new EventEmitter<string>(); 
  @Output() capasSeleccionadas = new EventEmitter<string[]>(); 

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onMapBaseChange(event: Event): void {
    const selectedMap = (event.target as HTMLSelectElement).value;
    this.mapaSeleccionado.emit(selectedMap);
  }

  onLayerChange(event: Event): void {
    const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      "#capacomp1 input[type='checkbox']"
    );
    const selectedLayers = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
    this.capasSeleccionadas.emit(selectedLayers);
  }
}
