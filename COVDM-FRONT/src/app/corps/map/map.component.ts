import {OnInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {icon, LatLng, Marker} from 'leaflet';
import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet-geosearch/assets/css/leaflet.css';

// Nécessaire pour l'ombre de l'icone...
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
export class MapComponent implements OnInit {

    private map;

    private initMap(): void {
        this.map = L.map('map', {
            // coords du Frankistan.
            center: [46.7111, 1.7191],
            zoom: 5
        });
        // tslint:disable-next-line:max-line-length
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        }).addTo(this.map);

    }

    private getGeolocation(): Promise<any> {
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

    private initGeocoder(): void {
        const provider = new OpenStreetMapProvider();
        // @ts-ignore
        const searchControl = new GeoSearchControl({
            provider,
            autoComplete: true,
            autoCompleteDelay: 250,
            style: 'bar',
            autoClose: true,
            keepResult: true
        });
        this.map.addControl(searchControl);
    }

    ngOnInit(): void {
        this.initMap();
        this.initGeocoder();
        // Cherche la localisation de l'utilisateur.
        this.getGeolocation().then(pos => {
            console.log(`Position: ${pos.lat} ${pos.lng}`);

            const latlng = new LatLng(pos.lat, pos.lng);

            L.marker(latlng).addTo(this.map);
            L.circle(latlng, {radius: 10000}).addTo(this.map);

            this.map.flyTo(latlng, 10, {
                animate: true,
                duration: 1.5
            });
        })
            .catch(err => console.warn(err.message));
    }
}
