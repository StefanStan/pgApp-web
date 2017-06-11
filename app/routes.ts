import { Routes } from '@angular/router';
import {DBManagement} from "./src/pgapp/db/db.management.component";

let appId = "pgapp";


export const routes: Routes = [
  {path: appId,       component: DBManagement}
];
