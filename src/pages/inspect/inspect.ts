import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Entry } from '../../app/entry';

/**
 * Generated class for the InspectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-inspect',
  templateUrl: 'inspect.html',
})
export class InspectPage {

private entry = Entry;
private imageurl : string;

  constructor(public viewCtrl: ViewController,
    navparams: NavParams) {
    this.entry = navparams.get('entry');
    this.imageurl = navparams.get('imageurl');
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log(this.entry);
  }

  

}
