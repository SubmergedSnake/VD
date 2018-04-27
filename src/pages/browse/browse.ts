import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { InspectPage } from '../inspect/inspect';
import { EntryService } from '../../app/entry.service';
import { Entry } from '../../app/entry';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'browse',
  templateUrl: 'browse.html',
  providers: [Entry]
})
export class Browse {

  public entries: Entry[] = [];

  constructor(public modalCtrl: ModalController,
    private sqlite: SQLite, private entry: Entry) { }


  ionViewWillEnter() {
    this.entries.length = 0;
    this.getEntries();
  }


  getEntries(): void {

    this.sqlite.create({
      name: 'data.entries',
      location: 'default'
    }).then((db: SQLiteObject) => {
    db.executeSql('create table if not exists Entry(title VARCHAR(100), description VARCHAR(500), imageurl VARCHAR(150), temperature INTEGER, location VARCHAR(100), date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)', {})
         //.then(res => alert('Executed SQL'))
         .catch(e => alert(e + 'Error creating table...'));
     
      db.executeSql('select title, description, location, temperature, imageurl, date from Entry', {})
        .then(res => {
          
          for (var i = 0; i < res.rows.length; i++) {
            let entry = new Entry();
             entry.description = res.rows.item(i).description;
             entry.title = res.rows.item(i).title;
             entry.imageurl = res.rows.item(i).imageurl;
             entry.temperature = res.rows.item(i).temperature;
             entry.location = res.rows.item(i).location;
             entry.date = res.rows.item(i).date;         
             this.entries.push(entry);
           }
        })
        .catch(e => alert("Error going through rows" + e));
    })
    
  }

  presentModal(i: number) {
    let modal = this.modalCtrl.create(InspectPage, { entry: this.entries[i] });
    modal.present();
  }

  createDB() {
    this.sqlite.create({
      name: 'data.entries',
      location: 'default'
    })
      .then((db: SQLiteObject) => {


        db.executeSql('create table if not exists Entry(title VARCHAR(100), description VARCHAR(500), imageurl VARCHAR(150), temperature INTEGER, location VARCHAR(100), date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)', {})
          .then(() => alert('Executed SQL'))
          .catch(e => alert(e + "failed"));


      })
      .catch(e => alert(e));
  }





}
