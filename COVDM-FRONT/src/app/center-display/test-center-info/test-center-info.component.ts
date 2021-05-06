import {Component, OnDestroy, OnInit} from "@angular/core"
import {ActivatedRoute, Params} from "@angular/router"
import {Subscription} from "rxjs"
import {TestCenter} from "../../data/models/testcenters.model"
import {TestCenterService} from "../../data/testcenters.service"
import {Avis} from "../../data/models/avis.model"
import {User} from "../../data/models/user.model"
import {AvisTestService} from "../../data/avis-test.service"
import {UserService} from "../../data/user.service"
import {DialogInsertionAvisComponent} from "../dialog-insertion-avis/dialog-insertion-avis.component"
import {MatDialog} from "@angular/material/dialog"
import {SharedDataService} from "../../data/shared.service"

@Component({
    selector: "app-test-center-info",
    templateUrl: "./test-center-info.component.html",
    styleUrls: ["./test-center-info.component.scss"]
})
export class TestCenterInfoComponent implements OnInit, OnDestroy {
    isLoading: boolean = true
    private activeRouteSub: Subscription
    center: TestCenter = null
    centerId: string
    avis: Avis[] = []
    users: User[] = []
    averageRating: number = 0

    constructor(private route: ActivatedRoute,
                public testCenterService: TestCenterService,
                public avisTestService: AvisTestService,
                public userService: UserService,
                public dialog: MatDialog,
                public sharedDataService: SharedDataService) {
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

    decimals(x: number): number {
        return x - Math.trunc(x)
    }

    truncate(x: number): number {
        return Math.trunc(x)
    }

    ngOnInit(): void {
        this.activeRouteSub = this.route.params.subscribe((params: Params) => {
            this.centerId = params["centerID"]
            this.testCenterService.fetchTestCenters(() => {
                this.avisTestService.getAvisByCenterID(params["centerID"], (result: Avis[]) => {
                    this.userService.fetchUsers(() => {
                        this.center = this.testCenterService.getCenterByID(this.centerId)
                        this.avis = result
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

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogInsertionAvisComponent, {data: {rating: 3, title: "", content: ""}})

        dialogRef.afterClosed().subscribe(result => {
            if (!result) return
            let avis: Avis = {
                rating: result.rating,
                title: result.title,
                content: result.content,
                _id: undefined,
                testCenterID: this.centerId,
                userID: this.sharedDataService.user_id
            }
        })
    }

    ngOnDestroy(): void {
        this.activeRouteSub.unsubscribe()
    }
}
