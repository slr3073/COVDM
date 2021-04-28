import {NgModule} from "@angular/core"
import {BrowserModule} from "@angular/platform-browser"
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppRoutingModule} from "./app-routing.module"
import {AppComponent} from "./app.component"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {MatButtonModule} from "@angular/material/button"
import {MapComponent} from "./home/map/map.component"
import {MatExpansionModule} from "@angular/material/expansion"
import {HttpClientModule} from "@angular/common/http"
import {MatCheckboxModule} from "@angular/material/checkbox";
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component'

@NgModule({
    declarations: [
        AppComponent,
        MapComponent,
        HeaderComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatExpansionModule,
        HttpClientModule,
        MatCheckboxModule,
        MatToolbarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
