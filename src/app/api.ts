import { Injectable, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { cf } from './calendar';
import { Ent } from './ent';
import { Ent2 } from './ent2';

@Injectable()
export class Api {
  constructor(private http: HttpClient) {}

  async get(loading: any) {
    const u =
      'https://3b439zgym3-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1)%3B%20Browser%20(lite)&x-algolia-application-id=3B439ZGYM3&x-algolia-api-key=14a0c8d17665d52e61167cc1b2ae9ff1';
    let hs = await this.get2();

    for (let i = 0; i < _.size(cf); i++) {
      loading.txt = `Loading ${i}`;
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
      i2.date = dt1;
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

  async get3() {
    const u = 'https://graphql.messari.io/query';
    let hs = [];
    let a = true;
    let after = 1;
    const b = {
      operationName: 'AggregatedContents',
      variables: {
        first: 100000,
        where: {
          title_like: null,
          assetSlugs_in: null,
          subTypes_in: ['OFFICIAL_PROJECT_UPDATES', 'RESEARCH'],
        },
        after: '0',
      },
      query:
        'query AggregatedContents($first: Int, $after: PaginationCursor, $last: Int, $before: PaginationCursor, $where: AggregatedContentWhereInput) {\n  aggregatedContents(\n    first: $first\n    after: $after\n    last: $last\n    before: $before\n    where: $where\n  ) {\n    totalCount\n    pageInfo {\n      hasPreviousPage\n      hasNextPage\n      startCursor\n      endCursor\n      __typename\n    }\n    edges {\n      cursor\n      node {\n        id\n        subType\n        type\n        title\n        publishDate\n        link\n        assets {\n          id\n          name\n          slug\n          symbol\n          __typename\n        }\n        source {\n          id\n          platform\n          link\n          creator {\n            id\n            name\n            link\n            slug\n            ... on AssetCreator {\n              id\n              name\n              slug\n              asset {\n                id\n                name\n                slug\n                logo\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n',
    };
    const r = await this.http.post(u, b).toPromise();

    const r2 = _.get(r, 'data.aggregatedContents.edges');

    const r3 = _.map(r2, 'node');

    const r4 = _.map(r3, (it: Ent2) => {
      const it2 = new Ent2();
      it2.subType = it.subType;
      it2.title = it.title;
      const dt = new Date(it.publishDate * 1000);
      it2.publishDate = ` ${dt.getDate()}/${
        dt.getMonth() + 1
      }/${dt.getFullYear()}`;
      it2.link = it.link;
      it2.assets = _.join(_.map(it.assets, 'name'), ',');
      it2.source =
        _.get(it, 'source.platform') + ' ' + _.get(it, 'source.creator.name');
      if (it.subType == 'OFFICIAL_PROJECT_UPDATES') {
        it2.subType = 'OFFICIAL';
      }
      return it2;
    });
    return Promise.resolve(r4);
  }
}
