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
    let hs = await this.get2();
    console.log('get2', hs);

    for (let i = 0; i < _.size(cf); i++) {
      loading.txt = `loading ${i}`;
      const b = cf[i];
      const r = await this.http.post(u, b).toPromise();
      const h = _.get(r, 'results.0.hits');
      hs = hs.concat(h);
    }

    hs = _.map(hs, (i: Ent) => {
      const resources = _.map(i.resources, 'link') || [];
      let i2 = new Ent();
      i2.clone(i);
      i2.assets = _.join(i2.assets, ',');
      i2.resources = resources;
      let dt1 = '';
      if (i.eventDate != null) {
        const dt = new Date(i.eventDate * 1000);
        i2.eventDate = dt;
        dt1 = dt1 + ` ${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
      }
      if (i.updateDate != null) {
        const dt = new Date(i.updateDate * 1000);
        i2.updateDate = dt;
        dt1 = dt1 + ` ${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
      }
      return i2;
    });

    hs.sort(function (a1: Ent, b1: Ent) {
      return b1.updateDate - a1.updateDate;
    });

    const res = [];
    const ids = [];
    for (let i = 0; i < _.size(hs); i++) {
      const it: Ent = hs[i];
      const id = it.objectID;
      if (!_.includes(ids, id)) {
        res.push(it);
        ids.push(id);
      }
    }

    loading.txt = '';

    return Promise.resolve(res);
  }

  async get2() {
    const u =
      'https://3b439zgym3-2.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1)%3B%20Browser%20(lite)&x-algolia-application-id=3B439ZGYM3&x-algolia-api-key=14a0c8d17665d52e61167cc1b2ae9ff1';
    let hs = [];
    let a = true;
    let page = 0;
    while (a) {
      const b = `{"requests":[{"indexName":"event","params":"highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&analyticsTags=%5B%22location_intel%22%2C%22intel_view_list%22%5D&maxValuesPerFacet=500&query=&page=${page}&hitsPerPage=1000&facets=%5B%22assets%22%2C%22category%22%2C%22importance%22%2C%22status%22%2C%22subCategory%22%2C%22tags%22%5D&tagFilters="}]}`;
      const r = await this.http.post(u, b).toPromise();
      const h = _.get(r, 'results.0.hits');
      if (_.size(h) == 0) a = false;
      hs = hs.concat(h);
      page += 1;
    }

    return Promise.resolve(hs);
  }
}
