import {Component, OnDestroy, OnInit} from "@angular/core"
import {Subscription} from "rxjs"
import {ActivatedRoute, Params} from "@angular/router"
import {VaccinationCenterService} from "../data/vaccination.service"
import {VaccinationCenter} from "../data/models/vaccinationcenter.model"

@Component({
    selector: "app-vaccination-center-info",
    templateUrl: "./vaccination-center-info.component.html",
    styleUrls: ["./vaccination-center-info.component.scss"]
})
export class VaccinationCenterInfoComponent implements OnInit, OnDestroy {
    private activeRouteSub: Subscription
    center: VaccinationCenter = null
    centerId: string

    constructor(private route: ActivatedRoute, public vaccinationCenterService: VaccinationCenterService) {
    }

    ngOnInit(): void {
        this.activeRouteSub = this.route.params.subscribe((params: Params) => {
            this.centerId = params["centerID"]
            this.vaccinationCenterService.fetchVaccinationCenters(() => {
                this.center = this.vaccinationCenterService.getCenterByID(this.centerId)
            })
        })
    }

    ngOnDestroy(): void {
        this.activeRouteSub.unsubscribe()
    }
}
