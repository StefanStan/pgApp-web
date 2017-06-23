import {Component} from "@angular/core";
import {DBManagementService} from "./db.management.service";
import * as moment from "moment";
import _date = moment.unitOfTime._date;

@Component({
  selector: "db-management",
  template: require("./db.management.component.html"),
  providers: [DBManagementService]
})
export class DBManagement {
  public dbs: Array<any> = [];

  constructor(
    private dbManagementService: DBManagementService
  ) {
    this.dbs = [];
  }

  public getDBs() {
    this.dbs = [];

    this.dbManagementService.getDBs((dbNames) => {
      dbNames.forEach((element, index, array) => {
        this.dbManagementService.changeDB(element, "status", (resp) => {
          this.dbs.push({key: element, value: 'started', date: new Date()});
        }, (resp) => {
          this.dbs.push({key: element, value: 'stoped', date: new Date()});
          console.log(this.dbs);
        })
      });
    }, (y) => {
      console.error(y);
    });
  }

  public startDB(dbName: string) {
    console.log(this.dbs[2].date.toString());
    this.dbManagementService.changeDB(dbName, "start", (resp) => {

    }, (resp) => {

    });
  }

  public stopDB(dbName: string) {
    this.dbManagementService.changeDB(dbName, "stop", (resp) => {

    }, (resp) => {

    });
  }

  public basebackupDB(dbName: string) {
    let elem;

    this.dbs.forEach((element, index, array) => {
      if(element.key == dbName) {
        elem = element;
      }
    });

    this.dbManagementService.basebackupDB(dbName, (resp) => {
      elem.basebackupStatusTrue = "OK";
    }, (resp) => {
      elem.basebackupStatusFalse = "NOT OK";
    });
  }

  public revertDB(dbName: string, date: string) {
    let elem;

    this.dbs.forEach((element, index, array) => {
      if(element.key == dbName) {
        elem = element;
      }
    });

    let _date = elem.date + ":00 EEST";

    this.dbManagementService.revertDB(dbName, _date, (resp) => {
      elem.revertStatusTrue = "OK";
    }, (resp) => {
      elem.revertStatusFalse = "NOT OK";
    });
  }
}
