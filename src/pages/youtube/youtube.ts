import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserVM, PhotoVM, VideoVM } from '../../app/app.viewmodels';
import  AppConstants from '../../app/app.constants';
import { GlobalService } from '../../app/app.globals';
import { Platform } from 'ionic-angular';
import { GoogleService } from '../../app/app.googleservice';
import { debounce } from 'ionic-angular/util/util';

@Component({
  selector: 'page-about',
  templateUrl: 'youtube.html'
})
export class YoutubePage {
  user:UserVM = {
    isLoggedIn: false,
    profile: {},
    authProvider: "",
    userId: ""
  };

  photos:PhotoVM[] = [];
  videos:VideoVM[] = [];
  constructor(public navCtrl: NavController, private globals: GlobalService, private platform: Platform, private gSvc: GoogleService) {
    let currentObj = this;
    // platform.ready().then(() => {
    //   currentObj.gSvc.InitClient()
    //   .then(res => {
    //     currentObj.gSvc.Login().then(res=>{
    //       currentObj.gSvc.GetUserDetails()
    //       .then(res=>{
    //         debugger;
    //       })
    //       .catch(e=>console.log("Error getting Google usser info.", e))
    //     }).catch(e=>console.log("Error signing in using Google", e));
    //   })
    //   .catch(e => console.log("Error initating Google api", e));
    // });
  }

  googleLogin(){
    let currentObj = this;
    this.gSvc.Login()
    .then((res:any)=>{
      currentObj.user.userId = res.userId;
      currentObj.user.authProvider = AppConstants.GoogleProvider;
      currentObj.user.profile = {
        name: res.displayName,
        email: res.email,
        imageUrl: res.imageUrl,
        idToken: res.idToken,
        serverAuthCode: res.serverAuthCode
      };
      currentObj.user.isLoggedIn = true;
    })
    .catch(e=>console.log("Error getting Google user info.", e));
  }

  logout() {
    let currentObj = this;
    if(currentObj.user.isLoggedIn && currentObj.user.authProvider === AppConstants.GoogleProvider){
      currentObj.gSvc.Logout()
        .then( res => {
          currentObj.user.isLoggedIn = false;
          currentObj.user.profile = {};
          currentObj.user.authProvider = "";
          currentObj.user.userId = "";
          currentObj.globals.setUser(currentObj.user);
          currentObj.globals.removeUser();
          currentObj.photos = [];
          currentObj.videos = [];
        })
        .catch(e => console.log('Error logout from Google', e));
    }
  }
}
