import { PhotoVM, VideoVM } from './app.viewmodels';
import { Injectable } from '@angular/core';
import { PropertyBindingType } from '@angular/compiler';
import { GooglePlus } from '@ionic-native/google-plus';

declare var gapi: any;

@Injectable()
export class GoogleService {
    constructor(private googlePlus: GooglePlus) {
    }
    InitClient() {
        return new Promise((resolve, reject) => {
            gapi.load('client:auth2', function () {
                let client = gapi.client.init({
                     apiKey: 'AIzaSyAd1AnRFU2yS-yA2zGuRZpPfkLCrMAXCkk',
                     discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
                     clientId: '562231822112-603n5c4l84689kj7djj0m7012i960jbd.apps.googleusercontent.com',
                     scope: 'https://www.googleapis.com/auth/youtube.readonly',
                     immediate: true,
                     cookiepolicy: 'single_host_origin'
                 });
                 var signIn = gapi.auth2.getAuthInstance();
                 return resolve(true);
               });
        });
        

        
        // gapi.auth2.authorize({
        //     apiKey: 'AIzaSyAd1AnRFU2yS-yA2zGuRZpPfkLCrMAXCkk',
        //     discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
        //     clientId: '562231822112-603n5c4l84689kj7djj0m7012i960jbd.apps.googleusercontent.com',
        //     scope: 'https://www.googleapis.com/auth/youtube.readonly',
        //     immediate: true
        //   })
        //   .then((res)=>{
        //       var temp =res;
        //       var signIn = gapi.auth2.getAuthInstance();
        //   }, (error)=>{
        //     var temp =error;
        // })
        //var signIn = gapi.auth2.getAuthInstance();
        // .then((res)=> {
        //     return Promise.resolve(res);
        // }, (error)=>{
        //     return Promise.reject(error);
        // });
        
        // .then(function () {
        //   // Listen for sign-in state changes.
        //   //gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        //   // Handle the initial sign-in state.
        //   //updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        // });
    }

    Login() {
        return this.googlePlus.login({
            scopes: 'https://www.googleapis.com/auth/youtube.readonly',
            webClientId: '562231822112-krvnr5kg7paosb3ltk5b5j3b6oi9g77q.apps.googleusercontent.com',
            offline: true
        }).then( (res) => {    
            console.log(res);
            return Promise.resolve(res);
        })
        .catch(err => {    
            console.log(err);
            return Promise.reject(err);
        });
        //return gapi.auth2.getAuthInstance().signIn().then((res)=> Promise.resolve(res), (error)=>Promise.reject(error));
    }

    Logout(){
        return this.googlePlus.logout().then( (res) => {    
            return Promise.resolve(res);
        })
        .catch(err => {    
            return Promise.reject(err);
        });
    }

    GetUserDetails(){
        // Make an API call to the People API, and print the user's given name.
       return gapi.client.people.people.get({
            'resourceName': 'people/me',
            'requestMask.includeField': 'person.names'
        }).then(function(response) {
            Promise.resolve(response);
            //console.log('Hello, ' + response.result.names[0].givenName);
        }, function(reason) {
            Promise.reject(reason);
            //console.log('Error: ' + reason.result.error.message);
        });
    }
}