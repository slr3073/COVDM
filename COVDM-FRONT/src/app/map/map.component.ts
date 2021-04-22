import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  private map;
  readonly accessToken = 'pk.eyJ1IjoiZGVsaXJpb3VzIiwiYSI6ImNra3duNmlhNzA2dXUydmw2aTIzMDVlNHIifQ.gC3ae8QyA_ercwGZO_koMw';

  private initMap(): void {
      this.map = L.map('map', {
          center: [43.1312147, -0.211457],
          zoom: 15
      });

      // tslint:disable-next-line:max-line-length
      const mapboxTiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' + this.accessToken, {
          attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          tileSize: 512,
          zoomOffset: -1
      });

      mapboxTiles.addTo(this.map);
  }
  constructor() { }

  ngAfterViewInit(): void {
      this.initMap();
  }

}
