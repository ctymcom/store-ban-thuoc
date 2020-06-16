import { BaseController } from "./baseController";
import { IBaseStatic } from "./baseModel";
import { FindOptions } from "sequelize";
import { ErrorHelper } from "../helpers";
// import { baseError } from "./baseError";

export interface IQueryOptions {}

export class CrudController<M extends IBaseStatic> extends BaseController {
  model: M;

  constructor(model: M) {
    super();
    this.model = model;
  }

  async findAll(options?: FindOptions) {
    return await this.model.findAll(options);

    // const [records, total] = await Promise.all([
    //   this.model.findAll(options),
    //   this.model.count(options),
    // ]);

    // return {
    //   records,
    //   total,
    // };
  }

  async findOne(options?: FindOptions) {
    return await this.model.findOne(options);
  }

  async count(options?: FindOptions) {
    delete options.include;
    return await this.model.count(options);
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
    // if (!record) throw baseError.error("empty_data");
    await record.destroy({});
    return record;
  }

  async deleteMany(ids: string[]) {
    return await this.model.destroy({ where: { id: { $in: ids } } });
  }
}
