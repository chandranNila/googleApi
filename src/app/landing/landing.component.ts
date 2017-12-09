import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../common.service';


declare const gapi: any;
declare const $: any;
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, AfterViewInit {

    auth2: any;
    public key: any;
  constructor(private router: Router, private commonService: CommonService) { }

  ngOnInit() {}

    ngAfterViewInit() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: '397011996209-gn7ssdki5o3eahvbt2c69l0qn22ljmg5.apps.googleusercontent.com',
                scope: 'https://www.googleapis.com/auth/drive'
            });
            this.handleAuthResult(document.getElementById('glogin'));
        });
    }


    handleAuthResult(element) {
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
    }


    showUserInfo() {
        this.commonService.showUserDetails().then((result) => {
            console.log('result getDrive', result);
        }, (err) => {
            console.log('err getDrive', err);
        });

        /*const request = gapi.client.drive.about.get();
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
        });*/
    }
}
