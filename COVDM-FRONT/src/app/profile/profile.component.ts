import {Component, OnDestroy, OnInit} from "@angular/core"
import {User} from "../data/models/user.model"
import {Subscription} from "rxjs"
import {ActivatedRoute, Params} from "@angular/router"
import {UserService} from "../data/user.service"

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit, OnDestroy{
    private activeRouteSub: Subscription
    user: User = null
    userID: string = ""

    constructor(private route: ActivatedRoute, public userService: UserService) {
    }

    ngOnInit(): void {
        this.activeRouteSub = this.route.params.subscribe((params: Params) => {
            this.userID = params["userID"]
            this.userService.fetchUsers(() => {
                this.user = this.userService.getUserByID(this.userID)
            })
        })
    }

    ngOnDestroy(): void {
        this.activeRouteSub.unsubscribe()
    }


}
