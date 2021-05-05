import {Component, OnDestroy, OnInit} from "@angular/core"
import {Subscription} from "rxjs"
import {ActivatedRoute, Params} from "@angular/router"
import {VaccinationCenterService} from "../data/vaccination.service"
import {VaccinationCenter} from "../data/models/vaccinationcenter.model"
import {Avis} from "../data/models/avis.model"
import {AvisVaccinationService} from "../data/avis-vaccination.service"

@Component({
    selector: "app-vaccination-center-info",
    templateUrl: "./vaccination-center-info.component.html",
    styleUrls: ["./vaccination-center-info.component.scss"]
})
export class VaccinationCenterInfoComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
    horaires: any[] = []
    avis: Avis[] = []

    private activeRouteSub: Subscription
    center: VaccinationCenter = null
    centerId: string
    isLoading: boolean = true


    constructor(private route: ActivatedRoute, public vaccinationCenterService: VaccinationCenterService, public avisVaccService: AvisVaccinationService) {
    }

    ngOnInit(): void {
        this.activeRouteSub = this.route.params.subscribe((params: Params) => {
            this.centerId = params["centerID"]
            this.vaccinationCenterService.fetchVaccinationCenters(() => {
                this.center = this.vaccinationCenterService.getCenterByID(this.centerId)
                this.horaires = [{
                    lundi: this.center.rdv_lundi,
                    mardi: this.center.rdv_mardi,
                    mercredi: this.center.rdv_mercredi,
                    jeudi: this.center.rdv_jeudi,
                    vendredi: this.center.rdv_vendredi,
                    samedi: this.center.rdv_samedi,
                    dimanche: this.center.rdv_dimanche,
                }]
                this.isLoading = false
                this.avis = this.avisVaccService.getAvisByCenterID(params["centerID"])
            })
        })
    }

    ngOnDestroy(): void {
        this.activeRouteSub.unsubscribe()
    }
}
