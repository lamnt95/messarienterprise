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

  copyNews() {}

  copyIntel() {}

  copyResearch() {}

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

  news: any = '';
  intel: any = '';
  research: any = '';
  async load() {
    this.loading.txt = 'Loading ...';
    const news = await this.api.get3();
    const intel = await this.api.get(this.loading);
    const research = await this.api.fetchMessari();
    this.intel = JSON.stringify(intel);
    this.news = JSON.stringify(news);
    this.research = JSON.stringify(research);
    this.loading.txt = 'Loading Success';
    this.saveTextAsFile(this.intel, 'intel.json');
    this.saveTextAsFile(this.news, 'new.json');
    this.saveTextAsFile(this.research, 'research.json');
  }

  saveTextAsFile(data, filename) {
    if (!data) {
      console.error('Console.save: No data');
      return;
    }
    var blob = new Blob([data], { type: 'text/plain' });
    var e = document.createEvent('MouseEvents');
    var a = document.createElement('a');

    a = document.createElement('a');
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
    e.initEvent('click', true, false);
    a.dispatchEvent(e);
  }

  expFile() {
    var fileText = '{"a":"1", "b":"2"}';
    var fileName = 'data.json';
    this.saveTextAsFile(fileText, fileName);
  }

  runBat() {
    // console.log('runBat');
    // var WshShell = new ActiveXObject('WScript.Shell');
    // WshShell.Run('C:Users\nguyentunglamdeveclaim\test.bat');
  }
}
