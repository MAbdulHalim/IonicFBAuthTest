import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { YoutubePage } from '../pages/youtube/youtube';
import { ContactPage } from '../pages/contact/contact';
import { FacebookPage } from '../pages/facebook/facebook';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Facebook } from "@ionic-native/facebook";
import { NativeStorage } from '@ionic-native/native-storage';
import { GlobalService } from './app.globals';
import { FacebookService } from './app.fbservice';
import { GoogleService } from './app.googleservice';
import { GooglePlus } from '@ionic-native/google-plus';

@NgModule({
  declarations: [
    MyApp,
    YoutubePage,
    ContactPage,
    FacebookPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    YoutubePage,
    ContactPage,
    FacebookPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    NativeStorage,
    GlobalService,
    FacebookService,
    GooglePlus,
    GoogleService,
  ]
})
export class AppModule {}
