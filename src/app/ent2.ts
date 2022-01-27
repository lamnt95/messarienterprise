export class Ent2 {
  assets: any;
  link: any;
  publishDate: any;
  subType: any;
  title: any;
  source: any;
  clone(req: Ent2) {
    this.assets = req.assets;
    this.link = req.link;
    this.publishDate = req.publishDate;
    this.subType = req.subType;
    this.title = req.title;
    this.source = req.source;
  }
}
