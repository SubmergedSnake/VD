import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';
import { NewEntry } from '../pages/new_entry/new_entry';
import { Browse } from '../pages/browse/browse';
import { Home } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {InspectPage} from '../pages/inspect/inspect';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Geolocation } from '@ionic-native/geolocation';
import {HttpClientModule } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    NewEntry,
    Browse,
    Home,
    TabsPage,
    InspectPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewEntry,
    Browse,
    Home,
    TabsPage,
    InspectPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    Geolocation,
    SQLite
  ]
})
export class AppModule {}
