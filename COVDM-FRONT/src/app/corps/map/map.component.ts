import {OnDestroy, OnInit, Component} from "@angular/core"

// Imports des librairies de leaflet.
import * as L from "leaflet"
import {Browser, icon, LatLng, LeafletEvent, Marker} from "leaflet"
import {GeoSearchControl, OpenStreetMapProvider} from "leaflet-geosearch"
import * as L1 from "leaflet.markercluster"

// Import des styles nécessaires aux plugins de leaflet
import "leaflet-geosearch/dist/geosearch.css"
import "leaflet-geosearch/assets/css/leaflet.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"

// Import des services.
import {User} from "../models/user.model"
import {UserService} from "../user.service"
import {Subscription} from "rxjs"
import {TestCenter} from "../models/testcenters.model"
import {TestCenterService} from "../testcenters.service"
import {VaccinationCenter} from "../models/vaccinationcenter.model"
import {VaccinationCenterService} from "../vaccination.service"
import {CustomMarker} from "./CustomMarker"
import win = Browser.win
import {animate} from "@angular/animations"

// Nécessaire pour l'ombre de l'icone...
const iconRetinaUrl = "assets/marker-icon-2x.png"
const iconUrl = "assets/marker-icon.png"
const shadowUrl = "assets/marker-shadow.png"
const iconDefault = icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
})
Marker.prototype.options.icon = iconDefault// Marker du vaccin
let vaccineIcon = new (L.icon as any)({
    "iconUrl": "../../../assets/vaccineMarker.png",
    iconSize: [75, 75],
    iconAnchor: [0, 0],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
})

let testCenterIcon = new (L.icon as any)({
    "iconUrl": "../../../assets/testCenterMarker.png",
    iconSize: [75, 75],
    iconAnchor: [0, 0],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
})


@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit, OnDestroy {

    private map
    latlng: LatLng = new LatLng(0, 0)
    hasAllowedGeolocation: boolean = false

    testCenters: TestCenter[] = []
    vaccinationCenters: VaccinationCenter[] = []

    private _testCenterSub: Subscription = new Subscription()
    private _vaccinationCenterSub: Subscription = new Subscription()

    constructor(public testCenterService: TestCenterService, public vaccinationCenterService: VaccinationCenterService) {
    }

    private initMap(): void {
        this.map = L.map("map", {
            // coords du Frankistan.
            center: [46.7111, 1.7191],
            zoom: 5
        })

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "&copy; <a href=\"https://openstreetmap.org/copyright\">OpenStreetMap contributors</a>"
        }).addTo(this.map)

    }

    private getGeolocation(): Promise<any> {
        // TSLint rale à cause du "shadow-name" de resolve mais ça marche, osef.
        return new Promise((resolve, reject) => {
            navigator.geolocation.watchPosition(
                position => {
                    resolve({lat: position.coords.latitude, lng: position.coords.longitude})
                },
                err => {
                    reject(err)
                })
        })
    }

    private initGeocoder(): void {
        const provider = new OpenStreetMapProvider()
        // @ts-ignore
        const searchControl = new GeoSearchControl({
            provider,
            autoComplete: true,
            autoCompleteDelay: 250,
            style: "bar",
            autoClose: true,
            keepResult: true
        })
        this.map.addControl(searchControl)
    }

    addVaccinationCenter(vaccinationCenter: VaccinationCenter): any {
        // const pt = new (L.marker as any)({lat: vaccinationCenter.lat_coor1, lng: vaccinationCenter.long_coor1},
        //     {icon: vaccineIcon})
        //     .bindPopup(vaccinationCenter.nom)
        // .on("click", (event: MouseEvent) => {
        //     event.preventDefault
        //     const clickedMarker: L.Marker = <L.Marker><unknown>event.target
        //     console.log(clickedMarker)
        // })
        // const customMarker = new CustomMarker({lat: vaccinationCenter.lat_coor1, lng: vaccinationCenter.long_coor1},
        //     {icon: vaccineIcon}, {id: vaccinationCenter._id, type: "VaccinationCenter"})
        //     .addTo(this.map)
        //     .bindPopup(vaccinationCenter.nom)
        //     // Ne pas typer le param event en MouseEvent sinon ça marche pas.
        //     // Merci à certains typages de Leaflet qui cassent des trucs.
        //     .on("click", (event: LeafletEvent) => {
        //         // Y a pas de property preventDefault sur le type LeafletEvent.
        //         // event.preventDefault
        //         const clickedMarker: L.Marker = <L.Marker><unknown>event.target
        //         console.log(clickedMarker)
        //     })
        const vc = new (L.marker as any)({
                lat: vaccinationCenter.lat_coor1,
                lng: vaccinationCenter.long_coor1
            },
            {icon: vaccineIcon})
            .bindPopup(vaccinationCenter.nom)
        return vc
    }

    addTestCenter(testCenter: TestCenter): any {
        const tc = new (L.marker as any)({
                lat: testCenter.latitude,
                lng: testCenter.longitude
            },
            {icon: testCenterIcon})
            .bindPopup(testCenter.adresse)
        return tc
    }

    ngOnInit(): void {
        this.initMap()
        this.initGeocoder()
        this.getGeolocation().then(pos => {
            this.hasAllowedGeolocation = true
            console.log(`Position: ${pos.lat} ${pos.lng}`)

            this.latlng = new LatLng(pos.lat, pos.lng)

            L.marker(this.latlng).addTo(this.map).bindPopup("Vous êtes ici.")
            //L.marker(latlng, {icon: vaccineIcon}).addTo(this.map)
            L.circle(this.latlng, {radius: 10000}).addTo(this.map)
            this.map.flyTo(this.latlng, 10, {
                animate: true,
                duration: 1.5
            })
        })
            .catch(err => console.warn(err.message))
        this.vaccinationCenterService.fetchVaccinationCenters()
        this._vaccinationCenterSub = this.vaccinationCenterService.vaccinationCentersObservable.subscribe((vaccinationCenters: VaccinationCenter[]) => {
            this.vaccinationCenters = vaccinationCenters

            let markersVaccineCluster = new L1.MarkerClusterGroup()

            for (let i = 0; i < this.vaccinationCenters.length; i++) {
                const vc = this.addVaccinationCenter(this.vaccinationCenters[i])
                markersVaccineCluster.addLayer(vc)
            }
            this.map.addLayer(markersVaccineCluster)
        })

        this.testCenterService.fetchTestCenters()
        this._testCenterSub = this.testCenterService.testCenterObservable.subscribe((testCenters: TestCenter[]) => {
            this.testCenters = testCenters
            let markersTestCCluster = new L1.MarkerClusterGroup()

            for (let i = 0; i < this.testCenters.length; i++) {
                const tc = this.addTestCenter(this.testCenters[i])
                markersTestCCluster.addLayer(tc)
            }
            this.map.addLayer(markersTestCCluster)
        })
    }

    ngOnDestroy(): void {
        this._testCenterSub.unsubscribe()
        this._vaccinationCenterSub.unsubscribe()
    }

    goBackToLocation() {
        if(this.hasAllowedGeolocation){
            this.map.flyTo(this.latlng, 10, {
                animate: true,
                duration: 1.5
            })
        }
    }
}
