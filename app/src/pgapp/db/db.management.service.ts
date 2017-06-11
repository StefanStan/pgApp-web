import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';

const BASE_URL = 'http://ec2-54-200-208-222.us-west-2.compute.amazonaws.com:12345/pgapp';

@Injectable()
export class DBManagementService {

  constructor (
    private http: Http
  ) {

  }

  public getDBs(success, err){
    return this.http.get(`${BASE_URL}` + '/server')
      .map(res => res.json())
      .toPromise()
      .then((resp) => {
        success(resp);
      })
      .catch(resp => {
        // Execute error callback passed as parameter to the function
        err(JSON.parse(resp._body));
      });
  }

  public changeDB(dbName: string, action: string, success, err) {
    return this.http.post(`${BASE_URL}` + '/server?dbServerName=' + dbName + '&action=' + action, {})
      .map(res => res.json())
      .toPromise()
      .then((resp) => {
        success(resp);
      })
      .catch(resp => {
        // Execute error callback passed as parameter to the function
        err(resp);
      });
  }

  public basebackupDB(dbName: string, success, err) {
    return this.http.post(`${BASE_URL}` + '/basebackup?dbServerName=' + dbName, {})
      .map(res => res.json())
      .toPromise()
      .then((resp) => {
        success(resp);
      })
      .catch(resp => {
        // Execute error callback passed as parameter to the function
        err(resp);
      });
  }

  public revertDB(dbName: string, dateTime: string, success, err) {
    return this.http.post(`${BASE_URL}` + '/pitr?dbServerName=' + dbName + '&dateTime=' + dateTime, {})
      .map(res => res.json())
      .toPromise()
      .then((resp) => {
        success(resp);
      })
      .catch(resp => {
        // Execute error callback passed as parameter to the function
        err(resp);
      });
  }

  private static constructFormData(obj) {
    let result: string = "";

    for (let property in obj) {
      if (obj.hasOwnProperty(property)) {
        result += property + "=" + obj[property] + "&";
      }
    }
    if(result.length > 0) {
      return result.substring(0, result.length-1);
    }
    return result;
  }
}
