import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { cf } from './calendar';
import { Ent } from './ent';

@Injectable()
export class Api {
  constructor(private http: HttpClient) {}

  async get(loading: any) {
    const u =
      'https://3b439zgym3-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1)%3B%20Browser%20(lite)&x-algolia-application-id=3B439ZGYM3&x-algolia-api-key=14a0c8d17665d52e61167cc1b2ae9ff1';
    let hs = [];

    for (let i = 0; i < _.size(cf); i++) {
      loading.txt = `loading ${i}`;
      const b = cf[i];
      const r = await this.http.post(u, b).toPromise();

      const h = _.get(r, 'results.0.hits');
      let h2 = _.sortBy(h, [
        function (o: Ent) {
          if (o.updateDate != null) return o.updateDate;
          return o.eventDate;
        },
      ]);
      h2 = _.map(h, (i: Ent) => {
        const resources = _.map(i.resources, 'link') || [];
        let i2 = new Ent();
        i2.clone(i);
        i2.assets = _.join(i2.assets, ',');
        i2.resources = resources;
        if (i.eventDate != null) {
          const dt = new Date(i.eventDate * 1000);
          i2.eventDate = `${dt.getDate()}/${
            dt.getMonth() + 1
          }/${dt.getFullYear()}`;
        }
        if (i.updateDate != null) {
          const dt = new Date(i.updateDate * 1000);
          i2.updateDate = `${dt.getDate()}/${
            dt.getMonth() + 1
          }/${dt.getFullYear()}`;
        }
        return i2;
      });
      hs = hs.concat(h2);
    }

    loading.txt = '';
    return Promise.resolve(hs);
  }
}
