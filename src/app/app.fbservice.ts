import { PhotoVM, VideoVM } from './app.viewmodels';
import { Facebook } from '@ionic-native/facebook';
import { Injectable } from '@angular/core';

@Injectable()
export class FacebookService {
  constructor (private fb:Facebook) {
  }

  public GetLoginStatus() {
    return this.fb.getLoginStatus()
    .then(res => Promise.resolve(res))
    .catch(e => Promise.reject(e));
  }
  public Login() {
    return this.fb.login(['public_profile', 'user_friends', 'email', 'user_photos'])
    .then(res => Promise.resolve(res))
    .catch(e => Promise.reject(e));
  }

  public GetUserDetail(userid) {
    return this.fb.api(`/${userid}/?fields=id,email,name,picture,gender`,["public_profile"])
    .then(res => Promise.resolve(res))
    .catch(e => Promise.reject(e));
  }

  public Logout() {
    return this.fb.logout()
    .then( res => Promise.resolve(true))
    .catch(e => Promise.reject(e));
  }

  public GetUserPhotos(){
    return this.fb.api("/me/photos?fields=created_time,height,id,picture,name,updated_time,width",['user_photos'])
    .then(res=> Promise.resolve(res))
    .catch(e => Promise.reject(e));
  }

  public GetUserVideos(){
    return this.fb.api("me/videos?fields=permalink_url,picture,source,title,updated_time,created_time,id",['user_videos'])
    .then(res=> Promise.resolve(res))
    .catch(e => Promise.reject(e));
}
}