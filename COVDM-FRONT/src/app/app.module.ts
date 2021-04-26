import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MapComponent} from './corps/map/map.component';
import {StatsComponent} from './corps/stats/stats.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {HttpClientModule} from "@angular/common/http"

@NgModule({
    declarations: [
        AppComponent,
        MapComponent,
        StatsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatExpansionModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
