import "core-js";
import "zone.js/dist/zone";

import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import { NguiDatetimePickerModule } from '@ngui/datetime-picker';

import {App} from "./src/app";
import {routes} from "./routes";
import {DBManagement} from "./src/pgapp/db/db.management.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NguiDatetimePickerModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  declarations: [App, DBManagement],
  bootstrap: [App]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
