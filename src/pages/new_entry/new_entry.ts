
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { InspectPage } from '../inspect/inspect';
import { Geolocation } from '@ionic-native/geolocation';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { HttpClient } from '@angular/common/http';
import { Entry } from '../../app/entry';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

interface WeatherResponse {
  weather: string[3];
  main: { temp: number };
  wind: {};
}

interface Address {
  results: [{
    formatted_address: string;
  }];
}

@Component({
  selector: 'new_entry',
  templateUrl: 'new_entry.html',
  providers: [Entry]

})
export class NewEntry implements OnInit {
  //public entry: Entry;//FormGroup
 
  


  constructor(private formBuilder: FormBuilder, private camera: Camera,
    public loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    private http: HttpClient,
    private sqlite: SQLite,
  private entry : Entry) {

    this.entry.imageurl = "assets/imgs/vdfaded.png";
    /*this.entry = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      thumbnail: [''],
      temperature: [''],
      address: ['']
    };*/
  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  ngOnInit(): void {

    //this.createDB();
    //this.deletefrom();
      
    this.geolocation.getCurrentPosition().then((resp) => {

      this.http.get<WeatherResponse>('http://api.openweathermap.org/data/2.5/weather?lang=fi&units=metric&lat=' + resp.coords.latitude + '&lon=' + resp.coords.longitude + '&APPID=43f69cbe15344f9b7d72edfd3b50ce5c').subscribe(data => {
        // Read the result field from the JSON response.
        this.entry.temperature = Math.round(data.main.temp);
      });

      this.http.get<Address>('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + resp.coords.latitude + ',' + resp.coords.longitude + '&key=AIzaSyBG34DCabt21Nia725cQAJDEoReBrhi4g4').subscribe(data => {
        this.entry.location = data.results[2].formatted_address;
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  takePicture() {

    //let loading = this.loadingCtrl.create({
      //spinner: 'dots'

    //});

    //loading.present();
    this.camera.getPicture(this.options).then((imageData) => {

      this.entry.imageurl = 'data:image/jpeg;base64,' + imageData;
      //loading.dismiss();

    }, (err) => {
      // Handle error
      alert("Error taking photo: " + err);
    });
  }

deletefrom(){
  this.sqlite.create({
    name: 'data.entries',
    location: 'default'
}).then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM Entry', {})
        .then(res => {
          alert("Saved succesfully!");
        })
        .catch(e => {
          alert(JSON.stringify(e));
        });
    })

}

  saveEntry() {
    this.sqlite.create({
        name: 'data.entries',
        location: 'default'
    }).then((db: SQLiteObject) => {
      
            db.executeSql('INSERT INTO Entry (title, description, temperature, location, imageurl) VALUES (?,?,?,?,?)', [this.entry.title, this.entry.description, this.entry.temperature, this.entry.location, this.entry.imageurl])
            .then(res => {
              alert("Saved succesfully!");
            })
            .catch(e => {
              alert(JSON.stringify(e));
            });
        })
}

  createDB() {
    this.sqlite.create({
        name: 'data.entries',
        location: 'default'
    })
        .then((db: SQLiteObject) => {


            db.executeSql('create table if not exists Entry(id title VARCHAR(100), description VARCHAR(500), imageurl VARCHAR(150), temperature INTEGER, location VARCHAR(100), date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)', {})
                //.then(() => alert('Executed SQL'))
                .catch(e => alert(e + "failed"));


        })
        .catch(e => alert(e));
}


}