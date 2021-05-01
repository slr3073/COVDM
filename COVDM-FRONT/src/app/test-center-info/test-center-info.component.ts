import {Component, OnDestroy, OnInit} from "@angular/core"
import {ActivatedRoute, Params} from "@angular/router"
import {Subscription} from "rxjs"
import {TestCenter} from "../data/models/testcenters.model"
import {TestCenterService} from "../data/testcenters.service"

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

    constructor(private route: ActivatedRoute, public testCenterService: TestCenterService) {
    }

    ngOnInit(): void {
        this.activeRouteSub = this.route.params.subscribe((params: Params) => {
            this.centerId = params["centerID"]
            this.testCenterService.fetchTestCenters(() => {
                this.center = this.testCenterService.getCenterByID(this.centerId)
                this.isLoading = false
            })
        })
    }

    ngOnDestroy(): void {
        this.activeRouteSub.unsubscribe()
    }
}
