import { Component, OnInit, VERSION } from '@angular/core';
import { Api } from './api';
import { Ent } from './ent';
import { Ent2 } from './ent2';
import * as _ from 'lodash';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Api, ActivatedRoute],
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
  constructor(private api: Api, private route: ActivatedRoute) {}

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
    // const res = await this.api.get4();
    // this.data = _.map(_.get(res, 'a1'), (it: Ent) => {
    //   it.description =
    //     it.assets +
    //     ' - ' +
    //     it.subCategory +
    //     ' - ' +
    //     it.eventName +
    //     ' - ' +
    //     it.date;
    //   return it;
    // });
    // const a = _.uniq(_.map(this.data, 'importance'));
    // const b = _.uniq(_.map(this.data, 'status'));
    // console.log('a', a);
    // console.log('b', b);
    // this.data2 = _.get(res, 'a2');
  }

  async load() {
    this.route.queryParams.subscribe((params: Params) => {
      const tk = params['tk'];
      console.log('load', params, tk);
      this.loading.txt = 'Loading ...';
      // await this.api.fetchMessari();
      this.api.loadcoin(tk);
      // const r2 = await this.api.get(this.loading);
      // console.log('news', JSON.stringify(r1));
      // console.log('intel', JSON.stringify(r2));
      this.loading.txt = 'Loading Success';
    });
  }
}
