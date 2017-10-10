import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {

  service: ServiceVar = {
    header: {},
    sessionStore: '',
    authToken: '',
    options: {},
  };
/*public authToken = sessionStorage.getItem('accessToken');*/
  constructor(private http: Http) {

  this.service.sessionStore = sessionStorage.getItem('accessToken');
  console.log('this.service.sessionStore', this.service.sessionStore);

    this.service.header = new Headers();
    this.service.header.append('Accept', 'application/json');
    this.service.header.append('Authorization', 'Bearer ' + this.service.sessionStore);
    this.service.options = new RequestOptions({headers: this.service.header});
    /*console.log('environment', environment.baseUrl);*/
  }
  storeData: any;

 /* setValue (value) {
    console.log('value ser', value);
    this.storeData = value;
    console.log('this.storeData', this.storeData);
  }

  getValue () {
    console.log('this.storeData', this.storeData);
    return this.storeData;
  }*/

  getValue (maxResults) {
    console.log('maxResults', maxResults);
    console.log('this.service.options', this.service.header);
    return new Promise((resolve, reject) => {
      this.http.get('https://www.googleapis.com/drive/v2/files?' + maxResults, this.service.options)
        .map(res => res.json())
        .subscribe(res => {
          console.log('res', res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  putFiles (fileDetails) {
    console.log('fileDetails', fileDetails);
    console.log('this.service.options', this.service.header);
    return new Promise((resolve, reject) => {
      this.http.post('https://www.googleapis.com/drive/v2/files', fileDetails, this.service.options)
        .map(res => res.json())
        .subscribe(res => {
          console.log('res', res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



 /* driveDownloadFile(downloadUrl) {
    console.log('this.service.options', this.service.options);
    console.log('downloadUrl', downloadUrl);
    /!*console.log('mimeType', mimeType);*!/
    return new Promise((resolve, reject) => {
      this.http.get(downloadUrl, this.service.options)
        .map(res => res.json())
        .subscribe(res => {
          console.log('res', res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }*/


}

export class ServiceVar {
  header: any;
  sessionStore: any;
  authToken: any;
  options: any;
}
