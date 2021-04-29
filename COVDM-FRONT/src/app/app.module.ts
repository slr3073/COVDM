import {NgModule} from "@angular/core"
import {BrowserModule} from "@angular/platform-browser"
import {MatToolbarModule} from "@angular/material/toolbar"
import {AppRoutingModule} from "./app-routing.module"
import {AppComponent} from "./app.component"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {MatButtonModule} from "@angular/material/button"
import {MapComponent} from "./home/elements/map/map.component"
import {MatExpansionModule} from "@angular/material/expansion"
import {HttpClientModule} from "@angular/common/http"
import {MatCheckboxModule} from "@angular/material/checkbox"
import {HeaderComponent} from "./header/header.component"
import {HomeComponent} from "./home/home.component"
import {MatIconModule} from "@angular/material/icon"
import {MapOptionComponent} from "./home/elements/map-option/map-option.component"
import {FormsModule} from "@angular/forms"
import {MatInputModule} from "@angular/material/input"
import {VaccinationCenterInfoComponent} from "./vaccination-center-info/vaccination-center-info.component"
import {TestCenterInfoComponent} from "./test-center-info/test-center-info.component";
import { ProfileComponent } from './profile/profile.component'

@NgModule({
    declarations: [
        AppComponent,
        MapComponent,
        HeaderComponent,
        HomeComponent,
        MapOptionComponent,
        VaccinationCenterInfoComponent,
        TestCenterInfoComponent,
        ProfileComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatExpansionModule,
        HttpClientModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        FormsModule,
        MatInputModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
