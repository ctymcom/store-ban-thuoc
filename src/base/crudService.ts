import { BaseService } from "./baseService";
// import { IBaseStatic } from "./baseModel";
import { ErrorHelper, IParseQuery } from "../helpers";
// import { baseError } from "./baseError";
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQueryOptions {}

export class CrudService<M extends Model<Document, {}>> extends BaseService {
  model: M;

  constructor(model: M) {
    super();
    this.model = model;
  }

  async findAll(options: IParseQuery) {
    return await this.model
      .find(options.filter, options.select)
      .sort(options.order)
      .limit(options.limit)
      .skip(options.offset)
      .exec();
  }

  async findOne(options: IParseQuery) {
    return await this.model.findOne(options);
  }

  async count(options: IParseQuery) {
    return await this.model.countDocuments(options.filter);
  }

  async create(data: any) {
    return await this.model.create(data);
  }

  async updateOne(id: string, data: any) {
    await this.model.update(data, { where: { id } });
    let record = await this.model.findOne({ where: { id } });
    // if (!record) throw baseError.error("empty_data");
    if (!record) throw ErrorHelper.duplicateError("");
    return record;
  }

  async deleteOne(id: string) {
    let record = await this.model.findOne({ where: { id } });
    await record.remove();
    return record;
  }

  async deleteMany(ids: string[]) {
    return await this.model.remove({ where: { id: { $in: ids } } });
  }
}
