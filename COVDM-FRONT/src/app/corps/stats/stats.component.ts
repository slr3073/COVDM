import {Component, OnInit, OnDestroy} from "@angular/core"
import {User} from "../models/user.model"
import {UserService} from "../user.service"
import {Subscription} from "rxjs"
import {TestCenter} from "../models/testcenters.model"
import {TestCenterService} from "../testcenters.service"
import {VaccinationCenter} from "../models/vaccinationcenter.model"
import {VaccinationCenterService} from "../vaccination.service"

@Component({
    selector: "app-stats",
    templateUrl: "./stats.component.html",
    styleUrls: ["./stats.component.scss"]
})
export class StatsComponent implements OnInit, OnDestroy {

    users: User[] = []
    testCenters: TestCenter[] = []
    vaccinationCenters: VaccinationCenter[] = []

    private _userSub: Subscription = new Subscription()
    private _testCenterSub: Subscription = new Subscription()
    private _vaccinationCenterSub: Subscription = new Subscription()

    constructor(public userService: UserService, public testCenterService: TestCenterService, public vaccinationCenterService: VaccinationCenterService) {
    }

    ngOnInit(): void {
        this.userService.fetchUsers()
        this.testCenterService.fetchTestCenters()
        this.vaccinationCenterService.fetchVaccinationCenters()

        this._userSub = this.userService.userObservable.subscribe((users: User[]) => {this.users = users})
        this._testCenterSub = this.testCenterService.testCenterObservable.subscribe((testCenters: TestCenter[]) => {this.testCenters = testCenters})
        this._vaccinationCenterSub = this.vaccinationCenterService.vaccinationCentersObservable.subscribe((vaccinationCenters: VaccinationCenter[]) => {this.vaccinationCenters = vaccinationCenters})
    }

    ngOnDestroy(): void {
        this._userSub.unsubscribe()
        this._testCenterSub.unsubscribe()
        this._vaccinationCenterSub.unsubscribe()
    }

}
