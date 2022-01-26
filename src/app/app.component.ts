import { Component, OnInit, VERSION } from '@angular/core';
import { Api } from './api';
import { Ent } from './ent';

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
  constructor(private api: Api) {}

  ngOnInit() {
    console.log('init');
    this.api.get(this.loading).then((res) => {
      console.log('json', res);
      console.log('str', JSON.stringify(res));
      this.data = res;
    });
  }
}
