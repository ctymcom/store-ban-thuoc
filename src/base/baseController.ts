import { sequelize, Sequelize } from "./baseModel";

export class BaseController {
  constructor() {}

  async transaction(options?: Sequelize.TransactionOptions) {
    return await sequelize.transaction(options);
  }
}
