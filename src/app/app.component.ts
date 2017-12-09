import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import {CommonService} from './common.service';
import {Router} from '@angular/router';


declare const gapi: any;
declare const $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CommonService]
})
export class AppComponent implements OnInit {
  auth2: any;
  public allFilesData: any;
  public key: any;
  public singleFiles: any;
  public enableModel = false;

  constructor(private _zone: NgZone, private commonService: CommonService, private router: Router) {}

  ngOnInit() {
    console.log('hi');
    this.singleFiles = {};
  }


  /*ngAfterViewInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '397011996209-gn7ssdki5o3eahvbt2c69l0qn22ljmg5.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/drive'
      });
      this.handleAuthResult(document.getElementById('glogin'));
    });
  }*/



  getDriveFiles() {
    gapi.client.load('drive', 'v2', this.getFiles);
  }

  getFiles() {

  }

    /*handleAuthResult(element) {
        this.auth2.attachClickHandler(element, {},
            (loggedInUser) => {
                console.log('loggedInUser', loggedInUser);
                console.log('loggedInUser access_token', loggedInUser.Zi.access_token);
                this.key = loggedInUser.Zi.access_token;
                const aaa = sessionStorage.setItem('accessToken', this.key);
                console.log('aaa', aaa);
                console.log('this.key', this.key);
                const profile = loggedInUser.getBasicProfile();
                console.log('profile', profile);
                this.router.navigate(['/welcome']);
                setTimeout( () => {
                    this.showUserInfo();
                }, 2000);
            }, function (error) {
                console.log('error', error);
            });
    }*/

  /*Get Files List In drive*/

  getlistFiles() {
    console.log('this.key', this.key);
    const maxResults = 'maxResults=1000';
   this.commonService.getValue(maxResults).then((result) => {
      console.log('result getFiles', result);
      this.allFilesData = result['items'];
      console.log('this.allFilesData', this.allFilesData[0].downloadUrl);
    }, (err) => {
      console.log('err getFiles', err);
    });

  }

  /*Show User Information*/

  /*showUserInfo() {
    const request = gapi.client.drive.about.get();
    request.execute(function(resp) {
      if (!resp.error) {
        console.log('showUserInfo resp', resp);
        console.log('showUserInfo resp', resp.quotaBytesTotal);
        const sampleName = resp.name;
        const totalQuota = resp.quotaBytesTotal;
        const usedQuota = resp.quotaBytesUsed;
        document.getElementById('span-name').innerHTML = sampleName;
        document.getElementById('span-totalQuota').innerHTML = totalQuota;
        document.getElementById('span-usedQuota').innerHTML = usedQuota;
      }else {
        console.log('resp.error', resp.error);
      }
    });
  }*/


  /*Show individual File details*/

  individualFile(driveFiles) {
    this.enableModel = true;
    console.log('individual driveFiles', driveFiles);
   this.singleFiles = driveFiles;
    $('#myModal').modal();
  }

  onChange(event) {
    console.log('event', event.target.files);
    console.log('event', event.target.files[0].name);
    console.log('event', event.target.files[0].type);

    const fileDetails = {
      'title' : event.target.files[0].name,
      'mimeType' : event.target.files[0].type
    };

    console.log('fileDetails', fileDetails);
    this.commonService.putFiles(fileDetails).then((result) => {
      console.log('created fileDetails', result);
      this.allFilesData = result['items'];
    }, (err) => {
      console.log('err getFiles', err);
    });
  }

  getFolder(event) {
    console.log('event', event);
    let files = event.target.files;
    let path = files[0].webkitRelativePath;
    let Folder = path.split('/');
    console.log(Folder[0]);
  }



}
