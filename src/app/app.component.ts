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
  [x: string]: any;
  name = 'Angular ' + VERSION.major;
  loading = {
    txt: '',
  };
  data: Ent[];
  data2: Ent2[];
  tab = 1;
  constructor(private api: Api) {}

  clickTab1() {
    this.tab = 1;
  }

  clickTab2() {
    this.tab = 2;
  }

  async ngOnInit() {
    const res = await this.api.get4();
    this.data = _.get(res, 'a1');
    this.data2 = _.get(res, 'a2');
  }

  async load() {
    this.loading.txt = 'Loading ...';
    const r1 = await this.api.get3();
    const r2 = await this.api.get(this.loading);
    console.log('news', JSON.stringify(r1));
    console.log('intel', JSON.stringify(r2));
  }
}
