import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {HomeComponent} from "./home/home.component"
import {TestCenterInfoComponent} from "./test-center-info/test-center-info.component"
import {VaccinationCenterInfoComponent} from "./vaccination-center-info/vaccination-center-info.component"

const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "testCenter/:centerID", component: TestCenterInfoComponent},
    {path: "vaccinationCenter/:centerID", component: VaccinationCenterInfoComponent},
    {path: "**", redirectTo:""}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
