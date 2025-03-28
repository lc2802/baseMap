import { ChangeDetectorRef, Component, Input, OnInit, DoCheck } from '@angular/core';
import * as ol from 'ol';
import 'ol/ol.css';
import Tile from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import { LayerControllerComponent } from '../layers-controller/layers-controller.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [LayerControllerComponent],
})
export class MapComponent implements OnInit, DoCheck {
  @Input() mapaBase: string = ''; // Recibe el valor del mapa base
  @Input() capasSeleccionadas: string[] = []; // Recibe las capas seleccionadas

  private wms1: string = 'https://wms.ign.gob.ar/geoserver/ows';
  private wms2: string = 'https://imagenes.ign.gob.ar/geoserver/coberturas_del_suelo/ows';
  private wms3: string = 'https://wms.ign.gob.ar/geoserver/ign_riesgo/ows';
  private map: ol.Map | null = null;
  private baseLayer: Tile | null = null; // Mantiene la capa base
  private prevMapaBase: string = ''; // Guarda el valor previo de mapaBase
  private prevCapasSeleccionadas: string[] = []; // Guarda las capas seleccionadas previas
  private capasActivas: { [key: string]: Tile } = {}; // Guarda las capas activas

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.crearMapa();
    this.mapaBase = 'mapabase_topo';  // Valor inicial para mapaBase
    this.actualizarCapas();
  }

  ngDoCheck() {
    const capasSeleccionadasChanged =
      this.capasSeleccionadas.length !== this.prevCapasSeleccionadas.length ||
      this.capasSeleccionadas.some(
        (capa, index) => capa !== this.prevCapasSeleccionadas[index]
      );

    if (this.mapaBase !== this.prevMapaBase || capasSeleccionadasChanged) {
      this.actualizarCapas();
      this.prevMapaBase = this.mapaBase;
      this.prevCapasSeleccionadas = [...this.capasSeleccionadas];
      this.cdRef.detectChanges();
    }
  }

  crearMapa() {
    if (!this.map) {
      this.map = new ol.Map({
        target: 'map',
        view: new View({
          center: fromLonLat([-64, -38]),
          zoom: 5,
        }),
        controls: [],
      });
    }
  }

  actualizarCapas() {
    if (!this.map) {
      return;
    }

    if (this.mapaBase !== this.prevMapaBase) {
      if (this.baseLayer) {
       
        const newSource = new TileWMS({
          url: this.wms1,
          params: {
            LAYERS: this.mapaBase,
            FORMAT: 'image/png',
            TILED: true,
            TRANSPARENT: true,
          },
          serverType: 'geoserver',
        });
        this.baseLayer.setSource(newSource);
      } else {
        // Si la capa base no existe
        this.baseLayer = new Tile({
          source: new TileWMS({
            url: this.wms1,
            params: {
              LAYERS: this.mapaBase,
              FORMAT: 'image/png',
              TILED: true,
              TRANSPARENT: true,
            },
            serverType: 'geoserver',
          }),
        });
        this.map.addLayer(this.baseLayer); 
      }
    }

    const capasAEliminar = Object.keys(this.capasActivas).filter(
      (capa) => !this.capasSeleccionadas.includes(capa)
    );
    capasAEliminar.forEach((capa) => {
      this.map?.removeLayer(this.capasActivas[capa]);
      delete this.capasActivas[capa]; 
    });

    this.capasSeleccionadas.forEach((capa) => {
      if (!this.capasActivas[capa]) {
        let wmsCapaComplementaria: string;
        if (capa === 'coberturas_del_suelo') {
          wmsCapaComplementaria = this.wms2;
        } else {
          wmsCapaComplementaria = this.wms3;
        }

        const newLayer: Tile = new Tile({
          source: new TileWMS({
            url: wmsCapaComplementaria,
            params: {
              LAYERS: capa,
              FORMAT: 'image/png',
              TRANSPARENT: true,
            },
            serverType: 'geoserver',
          }),
        });

        // capa seleccionada
        this.map?.addLayer(newLayer);
        this.capasActivas[capa] = newLayer; // Guardamos la capa activa
      }
    });

    // Actualizar la capa base previamente cargada
    this.prevMapaBase = this.mapaBase;
    this.cdRef.detectChanges();
  }
}
