import {Component, OnDestroy, OnInit} from "@angular/core"
import {Subscription} from "rxjs"
import {ActivatedRoute, Params} from "@angular/router"
import {VaccinationCenterService} from "../data/vaccination.service"
import {VaccinationCenter} from "../data/models/vaccinationcenter.model"
import {Avis} from "../data/models/avis.model"
import {AvisVaccinationService} from "../data/avis-vaccination.service"
import {User} from "../data/models/user.model"
import {UserService} from "../data/user.service"

@Component({
    selector: "app-vaccination-center-info",
    templateUrl: "./vaccination-center-info.component.html",
    styleUrls: ["./vaccination-center-info.component.scss"]
})
export class VaccinationCenterInfoComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
    horaires: any[] = []
    avis: Avis[] = []
    users: User[] = []
    averageRating: number = 0
    private activeRouteSub: Subscription
    center: VaccinationCenter = null
    centerId: string
    isLoading: boolean = true


    constructor(private route: ActivatedRoute, public vaccCenterService: VaccinationCenterService, public avisVaccService: AvisVaccinationService, public userService: UserService) {
    }

    average(): number {
        let valeurTotale: number = 0
        this.avis.forEach(valeur => {
            valeurTotale += valeur.rating
        })
        return Math.round(valeurTotale * 2 / this.avis.length) / 2
    }

    isInteger(x: number): boolean {
        return !(this.decimals(x) != 0)
    }

    decimals(x: number): number{
        return x - Math.trunc(x)
    }

    truncate(x: number): number {
        return Math.trunc(x)
    }

    ngOnInit(): void {
        this.activeRouteSub = this.route.params.subscribe((params: Params) => {
            this.centerId = params["centerID"]

            this.vaccCenterService.fetchVaccinationCenters(() => {
                this.avisVaccService.getAvisByCenterID(params["centerID"], (avis: Avis[]) => {
                    this.userService.fetchUsers(() => {
                        this.center = this.vaccCenterService.getCenterByID(this.centerId)
                        this.horaires = [{
                            lundi: this.center.rdv_lundi,
                            mardi: this.center.rdv_mardi,
                            mercredi: this.center.rdv_mercredi,
                            jeudi: this.center.rdv_jeudi,
                            vendredi: this.center.rdv_vendredi,
                            samedi: this.center.rdv_samedi,
                            dimanche: this.center.rdv_dimanche,
                        }]
                        this.avis = avis
                        for (const avis of this.avis)
                            this.users.push(this.userService.getUserByID(avis.userID))

                        this.averageRating = this.average()
                        console.log(this.averageRating)
                        this.isLoading = false
                    })
                })
            })
        })
    }

    ngOnDestroy(): void {
        this.activeRouteSub.unsubscribe()
    }

    goToPage(url: string): void {
        window.location.href = url
    }
}
