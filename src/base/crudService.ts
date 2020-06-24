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

  async findOne(filter: any) {
    return await this.model.findOne(filter);
  }

  async count(options: IParseQuery) {
    return await this.model.countDocuments(options.filter);
  }

  async create(data: any) {
    return await this.model.create(data);
  }

  async updateOne(id: string, data: any) {
    await this.model.updateOne({ _id: id }, data);
    let record = await this.model.findOne({ _id: id });
    if (!record) throw ErrorHelper.recoredNotFound("Không tìm thấy dữ liệu");
    return record;
  }

  async deleteOne(id: string) {
    let record = await this.model.findOne({
      _id: id,
    });
    await record.remove();
    return record;
  }

  async deleteMany(ids: string[]) {
    let result = await this.model.deleteMany({
      _id: {
        $in: ids,
      },
    });

    return result.deletedCount;
  }
}
