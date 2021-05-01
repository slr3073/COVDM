import {Component, OnDestroy, OnInit} from "@angular/core"
import {User} from "../data/models/user.model"
import {Subscription} from "rxjs"
import {ActivatedRoute, Params} from "@angular/router"
import {UserService} from "../data/user.service"
import {Avis} from "../data/models/avis.model"

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit, OnDestroy {
    private activeRouteSub: Subscription
    isLoading: boolean = true
    user: User = null
    userID: string = ""
    avis: Avis[] = [
        {
            testCenterID: "6088460f81dedc5164122a9f",
            userID: "607454adff8dc42c8c4031a2",
            rating: 4,
            title: "Pas assez de SS",
            content: "Ce centre manque de sciences sociales mais pas trop mal dans l'ensemble"
        },
        {
            testCenterID: "6088460f81dedc5164122a9f",
            userID: "607454adff8dc42c8c4031a2",
            rating: 2,
            title: "assez de SS 2",
            content: "Ce centre maiales al dans l'ensemble"
        },
        {
            testCenterID: "6088460f81dedc5164122a9f",
            userID: "607454adff8dc42c8c4031a2",
            rating: 3,
            title: "Pas e SS 3",
            content: "Ce ccesmais pas trle"
        }]

    constructor(private route: ActivatedRoute, public userService: UserService) {
    }

    ngOnInit(): void {
        this.activeRouteSub = this.route.params.subscribe((params: Params) => {
            this.userID = params["userID"]
            this.userService.fetchUsers(() => {
                this.user = this.userService.getUserByID(this.userID)
                this.isLoading = false
            })
        })
    }

    ngOnDestroy(): void {
        this.activeRouteSub.unsubscribe()
    }
}
