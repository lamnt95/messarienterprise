import { Component, OnInit, VERSION } from '@angular/core';
import { Api } from './api';
import { Ent } from './ent';
import { Ent2 } from './ent2';
import * as _ from 'lodash';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Api],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  loading = {
    txt: '',
  };
  data: Ent[];
  data2: Ent2[];
  tab = 0;
  constructor(private api: Api) {}

  clickTab1() {
    this.tab = 1;
  }

  clickTab2() {
    this.tab = 2;
  }

  clickTab3() {
    this.tab = 3;
  }

  clickTab4() {
    this.tab = 4;
  }

  clickTab(tab) {
    this.tab = tab;
  }

  async ngOnInit() {
    setTimeout(() => {
      this.loadData();
    }, 3000);
  }

  async loadData() {
    const res = await this.api.get4();
    this.data = _.map(_.get(res, 'a1'), (it: Ent) => {
      it.description =
        it.assets +
        ' - ' +
        it.subCategory +
        ' - ' +
        it.eventName +
        ' - ' +
        it.date;
      return it;
    });
    this.data2 = _.get(res, 'a2');
  }

  async load() {
    this.loading.txt = 'Loading ...';
    const news = await this.api.get3();
    const intel = await this.api.get(this.loading);
    const research = await this.api.fetchMessari();
    console.log('news', JSON.stringify(news));
    console.log('intel', JSON.stringify(intel));
    console.log('research', JSON.stringify(research));
    this.loading.txt = 'Loading Success';
  }
}
