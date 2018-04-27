import { Injectable } from '@angular/core';
import { Entry } from './entry';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'

@Injectable()
export class EntryService {


    entries: Entry[];

    constructor(private sqlite: SQLite) { }


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

    getEntries(): Promise<Entry[]> {
        this.sqlite.create({
            name: 'data.entries',
            location: 'default'
        })

            .then((db: SQLiteObject) => {


                db.executeSql('select * from Entry', {})
                    .then((data) => {
                        for (var i = 0; i < data.rows.length; i++) {
                            alert(data.rows.item(i).description);
                        }
                    })

            })
            .catch(e => alert(e));
        return Promise.resolve(this.entries);
    }

    saveEntry(entry: Entry) {
        this.sqlite.create({
            name: 'data.entries',
            location: 'default'
        }).then((db: SQLiteObject) => {
                db.executeSql('INSERT INTO Entry VALUES (?, ?, ?, ?, ?)', [entry.title, entry.description, entry.imageurl, entry.temperature, entry.location])
                    .then(res => {
                        alert(res + "adfasfasdf");
                    })
            })

            .catch(e => alert("failed to save entry" + e));

    }
}