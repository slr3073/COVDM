import {Component, OnDestroy, OnInit} from "@angular/core"
import {Router} from "@angular/router"
import * as L from "leaflet"// Imports des librairies de leaflet.
import {icon, LatLng, Marker} from "leaflet"
import {GeoSearchControl, OpenStreetMapProvider} from "leaflet-geosearch"
import * as L1 from "leaflet.markercluster"
import "leaflet-geosearch/dist/geosearch.css" // Import des styles nécessaires aux plugins de leaflet
import "leaflet-geosearch/assets/css/leaflet.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import {Subscription} from "rxjs" // Import des services.
import {TestCenter} from "../../../data/models/testcenters.model"
import {TestCenterService} from "../../../data/testcenters.service"
import {VaccinationCenter} from "../../../data/models/vaccinationcenter.model"
import {VaccinationCenterService} from "../../../data/vaccination.service"
import {GlobalLatLngService} from "../../../data/shared.service"

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
Marker.prototype.options.icon = iconDefault

// Marker du vaccin
let vaccineIcon = new (L.icon as any)({
    iconUrl: "../../../assets/vaccineMarker.png",
    shadowAnchor: [0, 0],
    iconSize: [75, 75],
    iconAnchor: [0, 0],
    popupAnchor: [36, 2],
    tooltipAnchor: [-5, -3],
})

let testCenterIcon = new (L.icon as any)({
    iconUrl: "../../../assets/testCenterMarker.png",
    iconSize: [75, 75],
    iconAnchor: [0, 0],
    popupAnchor: [36, 2],
    tooltipAnchor: [-5, -3],
})

@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: ["./map.component.scss"],
    providers: [GlobalLatLngService]
})
export class MapComponent implements OnInit, OnDestroy {
    private map
    hasAllowedGeolocation: boolean = false
    markersVaccineCluster = new L1.MarkerClusterGroup()
    markersTestCCluster = new L1.MarkerClusterGroup()

    testCenters: TestCenter[] = []
    vaccinationCenters: VaccinationCenter[] = []
    TenKMRadius

    private _testCenterSub: Subscription = new Subscription()
    private _vaccinationCenterSub: Subscription = new Subscription()
    private _u_latlngSub: Subscription = new Subscription()

    constructor(public testCenterService: TestCenterService,
                public vaccinationCenterService: VaccinationCenterService,
                public u_latlng: GlobalLatLngService,
                private router: Router) {
    }

    private initMap(): void {
        this.map = L.map("map", {
            // coords de la France.
            center: [46.7111, 1.7191],
            zoom: 5
        })

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "&copy; <a href=\"https://openstreetmap.org/copyright\">OpenStreetMap contributors</a>"
        }).addTo(this.map)

    }

    private getGeolocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.hasAllowedGeolocation = true
                this.u_latlng.u_lat = position.coords.latitude
                this.u_latlng.u_lng = position.coords.longitude

                const latlng = new LatLng(this.u_latlng.u_lat, this.u_latlng.u_lng)

                this.TenKMRadius = L.circle({lat: this.u_latlng.u_lat, lng: this.u_latlng.u_lng}, {radius: 10000})
                L.marker(latlng).addTo(this.map).bindPopup("Vous êtes ici.")
                this.map.flyTo(latlng, 11.5, {animate: true, duration: 1.5})
            })
        } else {
            console.error("L'utilisateur a décliné la géolocalisation.")
        }
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
    deg2rad(deg) :number {
        return deg * (Math.PI/180)
    }

    getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) : number {
        let R = 6371; // Radius of the earth in km
        let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        let dLon = this.deg2rad(lon2-lon1);
       let a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return  R * c
    }


    getVaccinationCenterMarker(vaccinationCenter: VaccinationCenter): any {
        let numaddr = vaccinationCenter.adr_num ?? ""
        let distance = (this.hasAllowedGeolocation) ? "<b>Distance: </b>"+ Math.round(this.getDistanceFromLatLonInKm(this.u_latlng.u_lat, this.u_latlng.u_lng,
                                                                                        vaccinationCenter.lat_coor1, vaccinationCenter.long_coor1)) +" Km" : ""
        return new (L.marker as any)({
                lat: vaccinationCenter.lat_coor1,
                lng: vaccinationCenter.long_coor1
        }, {icon: vaccineIcon})
            .bindPopup(
                "<b>Nom : </b>" + vaccinationCenter.nom + "<br>" +
                "<b>Adresse : </b>" + numaddr + " " + vaccinationCenter.adr_voie + "<br>" +
                "<b>Ville : </b>" + vaccinationCenter.com_cp + " " + vaccinationCenter.com_nom + "<br>" +
                "<b>Tel : </b>" + vaccinationCenter.rdv_tel + "<br>"+ distance
            ).on("mouseover", (ev) => {
                ev.target.openPopup()
            })
            .on("mouseout", (ev) => {
                ev.target.closePopup()
            })
            .on("click", () => {
                this.router.navigate(["/vaccinationCenter/" + vaccinationCenter._id])
            })
    }

    getTestCenter(testCenter: TestCenter): any {
        let horaire = testCenter.horaire || "<strong>HORAIRES INDISPONIBLES.</strong>"
        let distance = (this.hasAllowedGeolocation) ? "<b>Distance: </b>"+ Math.round(this.getDistanceFromLatLonInKm(this.u_latlng.u_lat, this.u_latlng.u_lng,
            testCenter.latitude, testCenter.longitude)) +" Km" : ""
        return new (L.marker as any)({
                lat: testCenter.latitude,
                lng: testCenter.longitude
            },
            {icon: testCenterIcon})
            .bindPopup(
                "<b>Nom : </b>" + testCenter.rs + "<br>" +
                "<b>Adresse : </b>" + testCenter.adresse + "<br>" +
                "<b>Prendre RDV : </b>" + testCenter.tel_rdv + "<br>" +
                "<b>Horaires : </b>" + horaire + "<br>" +
                "<b>Mode prélèvement : </b>" + testCenter.mod_prel+"<br>"+ distance
            ).on("mouseover", (ev) => {
                ev.target.openPopup()
            })
            .on("mouseout", (ev) => {
                ev.target.closePopup()
            })
            .on("click", () => {
                this.router.navigate(["/testCenter/" + testCenter._id])
            })
    }

    ngOnInit(): void {
        this.initMap()
        this.initGeocoder()
        this.getGeolocation()

        this.vaccinationCenterService.fetchVaccinationCenters(() => {
            for (let i = 0; i < this.vaccinationCenters.length; i++) {
                const vc = this.getVaccinationCenterMarker(this.vaccinationCenters[i])
                this.markersVaccineCluster.addLayer(vc)
            }
            this.map.addLayer(this.markersVaccineCluster)
        })

        this._vaccinationCenterSub = this.vaccinationCenterService.vaccinationCentersObservable.subscribe((vaccinationCenters: VaccinationCenter[]) => {
            this.vaccinationCenters = vaccinationCenters
        })

        this.testCenterService.fetchTestCenters(() => {
            for (let j = 0; j < this.testCenters.length; j++) {
                const tc: any = this.getTestCenter(this.testCenters[j])
                this.markersTestCCluster.addLayer(tc)
            }
            this.map.addLayer(this.markersTestCCluster)
        })
        this._testCenterSub = this.testCenterService.testCenterObservable.subscribe((testCenters: TestCenter[]) => {
            this.testCenters = testCenters
        })

    }

    ngOnDestroy(): void {
        this._testCenterSub.unsubscribe()
        this._vaccinationCenterSub.unsubscribe()
        this._u_latlngSub.unsubscribe()
    }

    goBackToLocation(): void {
        if (!this.hasAllowedGeolocation) {
            this.map.flyTo({lat: this.u_latlng.u_lat, lng: this.u_latlng.u_lng}, 10, {animate: true, duration: 1.5})
        }
    }

    toggleVaccinationCenters(hide): void {
        (hide) ? this.map.addLayer(this.markersVaccineCluster) : this.map.removeLayer(this.markersVaccineCluster)
    }

    toggleTestCenters(hide): void {
        (hide) ? this.map.addLayer(this.markersTestCCluster) : this.map.removeLayer(this.markersTestCCluster)
    }

    toogle10kmCircleRadius(hide): void {

        if (this.hasAllowedGeolocation && hide) {
            this.map.addLayer(this.TenKMRadius)
        } else {
            this.map.removeLayer(this.TenKMRadius)
        }

    }
}
