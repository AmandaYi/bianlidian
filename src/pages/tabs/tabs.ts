import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { KindPage } from '../kind/kind';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab2Root = KindPage;
  // tab2Root = 'PayPasswordPage';
  tab3Root = 'SearchPage';
  tab4Root = ContactPage;

  constructor() {

  }
}
