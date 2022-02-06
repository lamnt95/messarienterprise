export class Ent {
  importance: any;
  subCategory: any;
  status: any;
  eventDate: any;
  updateDate: any;
  eventName: any;
  details: any;
  date: any;
  assets: any[];
  category: any;
  objectID: any;
  resources: any[];
  update: any;
  description: any;
  clone(req: Ent) {
    this.update = req.update;
    this.assets = req.assets;
    this.category = req.category;
    this.details = req.details;
    this.eventDate = req.eventDate;
    this.objectID = req.objectID;
    this.eventName = req.eventName;
    this.importance = req.importance;
    this.resources = req.resources;
    this.status = req.status;
    this.subCategory = req.subCategory;
    this.updateDate = req.updateDate;
    this.description = req.description;
  }
}
