import {Component, EventEmitter, Output} from "@angular/core"

@Component({
    selector: "app-map-option",
    templateUrl: "./map-option.component.html",
    styleUrls: ["./map-option.component.scss"]
})
export class MapOptionComponent {
    vaccinationCentersChecked: boolean = true
    testCentersChecked: boolean = true
    homeRangeChecked: boolean = false

    @Output() goToLocalisationClicked = new EventEmitter()
    @Output() vaccCBUpdated = new EventEmitter()
    @Output() testCBUpdated = new EventEmitter()
    @Output() rangeCBUpdated = new EventEmitter()

    updateVaccinationMarkers() {
        this.vaccCBUpdated.emit(this.vaccinationCentersChecked)
    }

    updateTestMarkers() {
        this.testCBUpdated.emit(this.testCentersChecked)
    }

    updateRangeDisplay() {
        this.rangeCBUpdated.emit(this.homeRangeChecked)
    }

    goBackToLocation() {
        this.goToLocalisationClicked.emit()
    }
}
