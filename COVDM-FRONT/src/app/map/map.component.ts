import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {icon, LatLng, Marker} from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

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
            // coords du Frankistan.
            center: [46.7111, 1.7191],
            zoom: 5
        });
        // tslint:disable-next-line:max-line-length
        const mapboxTiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' + this.accessToken, {
            attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            tileSize: 512,
            zoomOffset: -1
        });
        mapboxTiles.addTo(this.map);

        LCG.geocoder().addTo(this.map);
    }

    constructor() {
    }

    getGeolocation(): Promise<any> {
        // TSLint rale à cause du "shadow-name" de resolve mais ça marche, osef.
        return new Promise((resolve, reject) => {
            navigator.geolocation.watchPosition(
                position => {
                    resolve({lat: position.coords.latitude, lng: position.coords.longitude});
                },
                err => {
                    reject(err);
                });
        });
    }

    ngAfterViewInit(): void {
        this.initMap();
        // Cherche la localisation de l'utilisateur.
        // Réorganiser un peu tout ça...
        this.getGeolocation().then(pos => {
            console.log(`Position: ${pos.lat} ${pos.lng}`);
            const latlng = new LatLng(pos.lat, pos.lng);

            L.marker(latlng).addTo(this.map);
            L.circle(latlng, {radius: 10000}).addTo(this.map);
            this.map.flyTo(latlng, 10, {
                animate: true,
                duration: 2
            });
        })
            .catch(err => console.warn(err.message));
    }

}
