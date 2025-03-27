import { Component } from '@angular/core';
import * as ol from 'ol';
import 'ol/ol.css';
import Tile from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-map',
  standalone: true,  
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  // Variables necesarias para las capas WMS
  private wms1: string = "https://wms.ign.gob.ar/geoserver/ows";
  private wms2: string = "https://imagenes.ign.gob.ar/geoserver/coberturas_del_suelo/ows";
  private wms3: string = "https://wms.ign.gob.ar/geoserver/ign_riesgo/ows";

  private map: ol.Map | null = null;

  constructor() { }

  ngOnInit(): void {
    const mapaBaseHTML: HTMLSelectElement | null = document.getElementById("mapa") as HTMLSelectElement;
    const capaComplementariaHTML: NodeListOf<HTMLInputElement> = document.querySelectorAll("#capacomp1 input[type='checkbox']");

    // Función para crear el mapa
    const crearMapa = (mapa: string, capasSeleccionadas: string[]): void => {
      if (this.map) {
        this.map.setTarget(undefined);
        this.map = null;
      }

      const LAYERS: Tile[] = [];
      const wmsLayerBase: Tile = new Tile({
        source: new TileWMS({
          url: this.wms1,
          params: {
            LAYERS: mapa,
            FORMAT: "image/png",
            TILED: true,
            TRANSPARENT: true,
          },
          serverType: "geoserver",
        }),
      });
      LAYERS.push(wmsLayerBase);

      capasSeleccionadas.forEach((capa) => {
        let wmsCapaComplementaria: string;

        if (capa === "coberturas_del_suelo") {
          wmsCapaComplementaria = this.wms2;
        } else {
          wmsCapaComplementaria = this.wms3;
        }

        const layer: Tile = new Tile({
          source: new TileWMS({
            url: wmsCapaComplementaria,
            params: {
              LAYERS: capa,
              FORMAT: "image/png",
              TRANSPARENT: true,
            },
            serverType: "geoserver",
          }),
        });
        LAYERS.push(layer);
      });

      this.map = new ol.Map({
        target: "map",
        layers: LAYERS,
        view: new View({
          center: fromLonLat([-64, -38]),
          zoom: 5,
        }),
        controls: [],
      });
    };

    // Evento de cambio del mapa base
    mapaBaseHTML?.addEventListener("change", function (): void {
      const mapa: string = mapaBaseHTML.value;
      const capasSeleccionadas: string[] = Array.from(capaComplementariaHTML)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

      crearMapa(mapa, capasSeleccionadas);
    });

    // Evento de cambio de las capas complementarias
    capaComplementariaHTML.forEach((checkbox: HTMLInputElement) => {
      checkbox.addEventListener("change", function (): void {
        const mapa: string = mapaBaseHTML?.value ?? "";
        const capasSeleccionadas: string[] = Array.from(capaComplementariaHTML)
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.value);

        crearMapa(mapa, capasSeleccionadas);
      });
    });
  }
}
