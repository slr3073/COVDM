import {Component, ViewChild} from "@angular/core"
import {MapComponent} from "./elements/map/map.component"

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
    @ViewChild(MapComponent) map: MapComponent

    goToLocalisation() {
        this.map.goBackToLocation()
    }

    updateVaccinationMarkers(hide: boolean){
        this.map.toggleVaccinationCenters(hide)
    }

    updateTestMarkers(hide: boolean){
        this.map.toggleTestCenters(hide)
    }

}
