import { Component } from '@angular/core';

import { NewEntry } from '../new_entry/new_entry';
import { Browse } from '../browse/browse';
import { Home } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Home;
  tab2Root = NewEntry;
  tab3Root = Browse;

  constructor() {

  }
}
