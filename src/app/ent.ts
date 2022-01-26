export class Ent {
  assets: any[];
  category: any;
  details: any;
  eventDate: any;
  objectID: any;
  eventName: any;
  high: any;
  resources: any[];
  status: any;
  subCategory: any;
  updateDate: any;

  clone(req: Ent) {
    this.assets = req.assets;
    this.category = req.category;
    this.details = req.details;
    this.eventDate = req.eventDate;
    this.objectID = req.objectID;
    this.eventName = req.eventName;
    this.high = req.high;
    this.resources = req.resources;
    this.status = req.status;
    this.subCategory = req.subCategory;
    this.updateDate = req.updateDate;
  }
}
