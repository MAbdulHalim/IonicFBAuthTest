import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import  AppConstants from '../../app/app.constants';
import { GlobalService } from '../../app/app.globals';
import { Platform } from 'ionic-angular';
import { UserVM, PhotoVM, VideoVM } from '../../app/app.viewmodels';
import { FacebookService } from '../../app/app.fbservice';

@Component({
  selector: 'page-home',
  templateUrl: 'facebook.html'
})
export class FacebookPage {
  user:UserVM = {
    isLoggedIn: false,
    profile: {},
    authProvider: "",
    userId: ""
  };

  photos:PhotoVM[] = [];
  videos:VideoVM[] = [];

  constructor(public navCtrl: NavController, private globals: GlobalService, private platform: Platform, private fbSvc: FacebookService) {
    let currentObj = this;
    platform.ready().then(() => {
      currentObj.fbSvc.GetLoginStatus()
      .then(res => {
        //console.log(res.status);
        if(res.status === "connect") {
          globals.getUser().then(function(user){
            currentObj.user = user;
          });

          currentObj.getFBUserPhotosAndVideos();
        }
      })
      .catch(e => console.log(e));
    });
  }

  fbLogin() {
    let currentObj = this;
    currentObj.fbSvc.Login()
      .then(res => {
        if(res.status === "connected") {
          currentObj.user.userId = res.authResponse.userID;
          currentObj.user.authProvider = AppConstants.FBProvider;
          currentObj.getFBUserDetail(res.authResponse.userID);
        } else {
          currentObj.user.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getFBUserDetail(userid) {
    let currentObj = this;
    currentObj.fbSvc.GetUserDetail(userid)
      .then(res => {
        //console.log(res);
        currentObj.user.profile = res;
        currentObj.user.isLoggedIn = true;
        currentObj.globals.setUser(currentObj.user);
        currentObj.getFBUserPhotosAndVideos();
      })
      .catch(e => {
        //console.log(e);
      });
  }

  logout() {
    let currentObj = this;
    if(currentObj.user.isLoggedIn && currentObj.user.authProvider === AppConstants.FBProvider){
      currentObj.fbSvc.Logout()
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
        .catch(e => console.log('Error logout from Facebook', e));
    }
  }

  getFBUserPhotosAndVideos(){
    let currentObj = this;
    //currentObj.photos = [];
    currentObj.fbSvc.GetUserPhotos()
    .then(res=>{
      currentObj.photos = res.data;
      currentObj.fbSvc.GetUserVideos()
      .then(resVideos=>{
        currentObj.videos = resVideos.data;
      })
      .catch(e => console.log('Error getting user photos and videos', e));
    })
    .catch(e => console.log('Error getting user photos and videos', e));
  }
}
