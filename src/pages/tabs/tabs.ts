import { Component } from '@angular/core';

import { YoutubePage } from '../youtube/youtube';
import { ContactPage } from '../contact/contact';
import { FacebookPage } from '../facebook/facebook';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FacebookPage;
  tab2Root = YoutubePage;
  tab3Root = ContactPage;

  constructor() {

  }
}
