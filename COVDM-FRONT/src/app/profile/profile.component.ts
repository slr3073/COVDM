import {Component, OnDestroy, OnInit} from "@angular/core"
import {User} from "../data/models/user.model"
import {Subscription} from "rxjs"
import {ActivatedRoute, Params} from "@angular/router"
import {UserService} from "../data/user.service"
import {Avis} from "../data/models/avis.model"
import {AvisTestService} from "../data/avis-test.service"
import {AvisVaccinationService} from "../data/avis-vaccination.service"
import {SharedDataService} from "../data/shared.service"

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit, OnDestroy {
    private activeRouteSub: Subscription
    isLoadingUser: boolean = true
    isLoadingAvisTest: boolean = true
    isLoadingAvisVacc: boolean = true
    user: User = null
    avisTest: Avis[] = []
    avisVacc: Avis[] = []

    constructor(private route: ActivatedRoute, public userService: UserService, public avisTestService: AvisTestService,public sharedService : SharedDataService, public avisVaccService: AvisVaccinationService) {
    }

    ngOnInit(): void {
        this.activeRouteSub = this.route.params.subscribe((params: Params) => {
            this.userService.fetchUsers(() => {
                this.user = this.userService.getUserByID(params["userID"])
                this.isLoadingUser = false
            })
            this.avisTestService.fetchAvisTest(()=>{
                this.avisTest = this.avisTestService.getAvisByUserID(params["userID"])
                this.isLoadingAvisTest = false
            })
            this.avisVaccService.fetchAvisVaccination(()=>{
                this.avisVacc = this.avisVaccService.getAvisByUserID(params["userID"])
                this.isLoadingAvisVacc = false
            })
        })
    }

    ngOnDestroy(): void {
        this.activeRouteSub.unsubscribe()
    }
}
