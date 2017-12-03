import {Injectable} from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import {UserVM} from './app.viewmodels';

const userStorageName = 'user';

// singleton class for saving global varaiables across the app
@Injectable()
export class GlobalService {
    user:UserVM = undefined;
    
  constructor (private nativeStorage: NativeStorage) {
  }

  public getUser():Promise<UserVM> {
      //return this.user;
      let currentObj = this;
      if(this.user===undefined){
       return this.nativeStorage.getItem(userStorageName)
        .then( function (data) {
            // user is previously logged and we have his data
            currentObj.user = data;
            return currentObj.user;
        }, function (error) {
            currentObj.user = {
            isLoggedIn: false,
            profile: {},
            authProvider: "",
            userId: ""
            }
            return currentObj.user;
        });
        } else{
           return Promise.resolve(this.user);
        }
    }

  public setUser(user:UserVM){
        let currentObj = this;
        this.nativeStorage.setItem(userStorageName, user)
        .then(function(){
            currentObj.user = user;
        }, function (error) {
            console.log(error);
            currentObj.user = {
                isLoggedIn: false,
                profile: {},
                authProvider: "",
                userId: ""
              }
        });
    }

    public removeUser(){
        this.nativeStorage.remove(userStorageName);
    }
}