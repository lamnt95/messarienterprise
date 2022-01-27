import { Component, OnInit, VERSION } from '@angular/core';
import { Api } from './api';
import { Ent } from './ent';
import { Ent2 } from './ent2';

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
  tab = 1;
  constructor(private api: Api) {}

  clickTab1() {
    this.tab = 1;
  }

  clickTab2() {
    this.tab = 2;
  }

  async ngOnInit() {
    this.loading.txt = 'Loading ...';
    const r1 = await this.api.get3();
    this.data2 = r1;
    const r2 = await this.api.get(this.loading);
    this.data = r2;
    console.log('news', r1);
    console.log('news', JSON.stringify(r1));
    console.log('enter', r2);
    console.log('enter', JSON.stringify(r2));
  }
}
