import {Component, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import {resolve} from '@angular/compiler-cli/src/ngtsc/file_system';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

    private map;
    readonly accessToken = 'pk.eyJ1IjoiZGVsaXJpb3VzIiwiYSI6ImNra3duNmlhNzA2dXUydmw2aTIzMDVlNHIifQ.gC3ae8QyA_ercwGZO_koMw';

    private initMap(): void {
        // Lire : https://leafletjs.com/examples/mobile/

        this.map = L.map('map', {
            center: [69, 69],
            zoom: 10
        });

        // tslint:disable-next-line:max-line-length
        const mapboxTiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' + this.accessToken, {
            attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            tileSize: 512,
            zoomOffset: -1
        });
        mapboxTiles.addTo(this.map);
    }

    /*  getLocation(): void{
          if (navigator.geolocation) {
            console.log(navigator.permissions.query({name: 'geolocation'}));
            navigator.geolocation.getCurrentPosition((position => {
                const latitude = position.coords.latitude ;
                const longitude = position.coords.longitude;
                console.log(longitude, latitude);
            }));
          } else {
              console.warn('Geolocalisation refusee.');
          }
      }*/

    constructor() {
    }

    getGeolocation(): Promise<any> {
        // TSLint rale à cause du "shadow-name" de resolve mais ça marche, osef.
        return new Promise((resolve, reject) => {
            navigator.geolocation.watchPosition(
                position => {
                resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
            },
                error => {
                    reject(error);
                });
        });
    }

    ngAfterViewInit(): void {
        this.getGeolocation().then(pos =>
        {
            console.log(`Position: ${pos.lat} ${pos.lng}`);
        });
        this.initMap();
    }

}
