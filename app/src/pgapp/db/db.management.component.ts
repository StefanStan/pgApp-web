import {Component} from "@angular/core";
import {DBManagementService} from "./db.management.service";

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
          this.dbs.push({key: element, value: 'started'});
        }, (resp) => {
          this.dbs.push({key: element, value: 'stoped'});
        })
      });
    }, (y) => {
      console.error(y);
    });
  }

  public startDB(dbName: string) {
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
      elem.basebackupStatus = "OK";
    }, (resp) => {
      elem.basebackupStatus = "NOT OK";
    });
  }

  public revertDB(dbName: string, date: string) {
    let elem;

    this.dbs.forEach((element, index, array) => {
      if(element.key == dbName) {
        elem = element;
      }
    });

    this.dbManagementService.revertDB(dbName, elem.date, (resp) => {
      elem.revertStatus = "OK";
    }, (resp) => {
      elem.revertStatus = "NOT OK";
    });
  }
}
