import {Component} from "@angular/core"
import {SharedDataService} from "../data/shared.service"

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
    constructor(public sharedService: SharedDataService) {
    }
}
